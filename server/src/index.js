import { createApp } from './app.js'
import { config } from './config/env.js'
import { connectDB, disconnectDB } from './config/db.js'

let server

async function start() {
  try {
    await connectDB(config.mongoUri)
    const app = createApp()
    server = app.listen(config.port, () => {
      console.log(`[server] Ramesh Solar Services API listening on http://localhost:${config.port}`)
    })
  } catch (error) {
    console.error('[server] Failed to start:', error.message)
    process.exit(1)
  }
}

async function shutdown(signal) {
  console.log(`[server] ${signal} received. Shutting down...`)
  if (server) {
    server.close(async () => {
      await disconnectDB()
      process.exit(0)
    })
    setTimeout(() => process.exit(1), 10000).unref()
  } else {
    await disconnectDB()
    process.exit(0)
  }
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('unhandledRejection', (reason) => {
  console.error('[server] Unhandled rejection:', reason)
})

start()
