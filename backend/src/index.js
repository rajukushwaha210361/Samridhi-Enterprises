import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import homePageRoutes from './routes/profileRoute.js'
import adminRoutes from "./routes/adminRoute.js"
import contactRoute from "./routes/contactRoute.js"
import locationRoute from "./routes/locationRoute.js"
import productRoute from "./routes/prodcutRoute.js"
dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://samridhi-enterprises.vercel.app" // deploy hone ke baad real URL daalna
  ],
  credentials: true
}))
app.use(express.json())

app.get('/', (req, res) => res.send('Samridhi Enterprises API Running '))
app.use('/api/admin', adminRoutes)
app.use('/api/homepage', homePageRoutes)
app.use('/api/contact', contactRoute)
app.use('/api/location', locationRoute)
app.use('/api/product', productRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT} `))