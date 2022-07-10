
import express, { Response, Request } from "express"
import { getGoals, updateGoal, addGoal, deleteGoal } from "../controllers/goal.controller"

const goalRoute = express.Router()

// goalRoute.get('/', getGoals)
// goalRoute.post('/', addGoal)
// The above routes can be chained for less code, due to them sharing the same route
goalRoute.route('/').get(getGoals).post(addGoal)
// goalRoute.put('/:id', updateGoal)
// goalRoute.delete('/:id', deleteGoal)
goalRoute.route('/:id').delete(deleteGoal).put(updateGoal)

export default goalRoute
