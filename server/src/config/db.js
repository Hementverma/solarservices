import mongoose from 'mongoose'

export async function connectDB(uri) {
  if (mongoose.connection.readyState === 1) return mongoose.connection

  mongoose.set('strictQuery', true)
  await mongoose.connect(uri, {
    autoIndex: process.env.NODE_ENV !== 'production',
    serverSelectionTimeoutMS: 10000,
  })
  console.log(`[db] Connected to MongoDB database "${mongoose.connection.name}"`)
  return mongoose.connection
}

export async function disconnectDB() {
  await mongoose.disconnect()
}

export function dbHealth() {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting']
  return states[mongoose.connection.readyState] || 'unknown'
}
