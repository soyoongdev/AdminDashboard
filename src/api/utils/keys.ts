import dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.PORT || 9001,
  secretKey: process.env.SECRET_KEY || ''
}
