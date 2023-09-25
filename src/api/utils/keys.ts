import dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.PORT || 9001,
  mysql: {
    host: process.env.HOST || 'localhost',
    dbname: process.env.DB_NAME || 'shopair',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root@123'
  },
  secretKey: process.env.SECRET_KEY || ''
}
