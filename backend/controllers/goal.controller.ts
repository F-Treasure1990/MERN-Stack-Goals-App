//Middleware for handling exceptions 
import asyncHander from "express-async-handler";
import { Response, Request } from 'express';
//Goal Model Import
import Goal from '../models/goal.model';
import User from '../models/user.model';

import { RequestExtended } from "../middleware/auth.middleware"

// @desc Get Goals
// @route GET /api/goals
// @access Private
export const getGoals = asyncHander(async (req: RequestExtended, res: Response) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc Set Goal
// @route POST /api/goals
// @access Private
export const addGoal = asyncHander(async (req: RequestExtended, res: Response) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Add A Text Field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  });

  res.status(200).json(goal);
});

// @desc Update Goal
// @route PUT /api/goals/:id
// @access Private
export const updateGoal = asyncHander(async (req: RequestExtended, res: Response) => {
  // find goal with req.params id
  const goal = await Goal.findById(req.params.id)
  //if the goal does not exist return status 400 with an error letting one know a goal was not found
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  //find user attached to these goals
  const user = await User.findById(req.user.id)
  // check for user 
  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }
  // checking loged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not Authorised')
  }
  // if parameters are passed, mongoose will update infomation 
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
  // respond with status 200 and updated infomation 
  res.status(200).json(updatedGoal);
});

// @desc Delete Goal
// @route DELETE /api/goals/:id
// @access Private
export const deleteGoal = asyncHander(async (req: RequestExtended, res: Response) => {
  // find goal with req.params id
  const goal = await Goal.findById(req.params.id)
  //if the goal does not exist return status 400 with an error letting one know a goal was not found
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  const user = await User.findById(req.user.id)
  // check for user 
  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }
  // checking loged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not Authorised')
  }

  //Remove Goal
  await goal.remove()
  //Return Id of returned param
  res.status(200).json({ id: req.params.id })
});
