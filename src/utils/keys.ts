import dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.PORT || 9001,
  mongodb: {
    url: process.env.MONGO_URL || ''
  }
}
