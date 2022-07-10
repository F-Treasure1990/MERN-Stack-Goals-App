
import express, { Response, Request } from "express"
import * as dotenv from 'dotenv'
dotenv.config()
import connectDB from "./config/db"
import goalRoute from './routes/goal.route'
import errorHandler from "./middleware/error.middleware"

//Connect to mongoDB via Mongoose
connectDB()
// const port = process.env.PORT || 8000;
const port = 3000;
const app = express()

//middleware function which parses incoming JSON requests and places parsed data in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", goalRoute)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Application Listening at http://localhost:${port} 🚀`)
})

