import express from "express"
import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()
import connectDB from "./config/db"
import goalRouter from './routes/goal.router'
import userRouter from './routes/user.router'
import errorHandler from "./middleware/error.middleware"
import cors from 'cors'

//Connect to mongoDB via Mongoose
connectDB()
// const port = process.env.PORT || 8000;
const port = 8000;
const app = express()

//middleware function which parses incoming JSON requests and places parsed data in req.body
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", goalRouter)
app.use("/api/users", userRouter)

//Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend/build/index.html')))
}

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Application Listening at http://localhost:${port} 🚀`)
})

