import dotenv from 'dotenv'
import app from './app'
dotenv.config()

const { PORT } = process.env

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT} : localhost:${PORT}`)
  })
} catch (error) {
  console.log(`Server start error: ${error}`)
}
