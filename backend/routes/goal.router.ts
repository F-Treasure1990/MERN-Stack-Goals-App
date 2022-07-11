import express from "express"
import { getGoals, updateGoal, addGoal, deleteGoal } from "../controllers/goal.controller"
import Auth from "../middleware/auth.middleware"

const goalRouter = express.Router()

// goalRoute.get('/', getGoals)
// goalRoute.post('/', addGoal)
// The above routes can be chained for less code, due to them sharing the same route
goalRouter.route('/').get(Auth, getGoals).post(Auth,addGoal)
// goalRoute.put('/:id', updateGoal)
// goalRoute.delete('/:id', deleteGoal)
goalRouter.route('/:id').delete(Auth,deleteGoal).put(Auth,updateGoal)

export default goalRouter
