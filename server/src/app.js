import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import morgan from 'morgan'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { config } from './config/env.js'
import { dbHealth } from './config/db.js'
import sanitizeInput from './middleware/sanitize.js'
import errorHandler, { notFoundHandler } from './middleware/errorHandler.js'
import { publicApiLimiter } from './middleware/rateLimiters.js'
import authRoutes from './routes/authRoutes.js'
import enquiryRoutes from './routes/enquiryRoutes.js'
import contentRoutes from './routes/contentRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  if (process.env.TRUST_PROXY === 'true') app.set('trust proxy', 1)

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          upgradeInsecureRequests: config.isProduction ? [] : null,
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  )

  const allowedOrigins = [config.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173']
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
        return callback(new Error('Origin not allowed by CORS.'))
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
  )

  app.use(compression())
  app.use(express.json({ limit: '100kb' }))
  app.use(express.urlencoded({ extended: false, limit: '100kb' }))
  app.use(cookieParser())
  app.use(sanitizeInput)

  if (config.nodeEnv !== 'test') {
    app.use(morgan(config.isProduction ? 'combined' : 'dev'))
  }

  app.get('/api/health', (_req, res) => {
    const database = dbHealth()
    res.status(database === 'connected' ? 200 : 503).json({
      status: database === 'connected' ? 'ok' : 'degraded',
      database,
      environment: config.nodeEnv,
      timestamp: new Date().toISOString(),
    })
  })

  app.use('/api', publicApiLimiter)
  app.use('/api/auth', authRoutes)
  app.use('/api/enquiries', enquiryRoutes)
  app.use('/api/content', contentRoutes)
  app.use('/api/admin', adminRoutes)
  app.use('/api', notFoundHandler)

  const clientDist = path.resolve(__dirname, '../../client/dist')
  const indexFile = path.join(clientDist, 'index.html')

  if (fs.existsSync(indexFile)) {
    app.use(
      express.static(clientDist, {
        index: false,
        maxAge: config.isProduction ? '1d' : 0,
      }),
    )
    app.get('*', (req, res) => {
      res.set('Cache-Control', 'no-cache')
      res.sendFile(indexFile)
    })
  } else {
    app.get('/', (_req, res) => {
      res.json({
        message: 'Ramesh Solar Services API is running.',
        note: 'Build the client with npm run build, or run the Vite dev server for the website.',
      })
    })
  }

  app.use(errorHandler)

  return app
}

export default createApp()
