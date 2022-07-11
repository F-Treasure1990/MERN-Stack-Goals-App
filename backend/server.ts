import express from "express"
import * as dotenv from 'dotenv'
dotenv.config()
import connectDB from "./config/db"
import goalRouter from './routes/goal.router'
import userRouter from './routes/user.router'
import errorHandler from "./middleware/error.middleware"

//Connect to mongoDB via Mongoose
connectDB()
// const port = process.env.PORT || 8000;
const port = 3000;
const app = express()

//middleware function which parses incoming JSON requests and places parsed data in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", goalRouter)
app.use("/api/users", userRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Application Listening at http://localhost:${port} 🚀`)
})

