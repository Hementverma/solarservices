import dotenv from 'dotenv'

dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

if (!process.env.JWT_SECRET) {
  if (isProduction) {
    throw new Error('JWT_SECRET must be set in production.')
  }
  console.warn('[config] JWT_SECRET is not set. Using a development-only fallback.')
}

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction,
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ramesh_solar',
  jwtSecret:
    process.env.JWT_SECRET ||
    'development-only-secret-change-before-deploying-ramesh-solar-services',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  cookieName: process.env.COOKIE_NAME || 'rss_admin_token',
  admin: {
    name: process.env.ADMIN_NAME || 'Ramesh Solar Admin',
    email: (process.env.ADMIN_EMAIL || 'admin@rameshsolar.in').toLowerCase(),
    password: process.env.ADMIN_PASSWORD || 'ChangeMe@123',
  },
}

if (isProduction && config.jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters in production.')
}
