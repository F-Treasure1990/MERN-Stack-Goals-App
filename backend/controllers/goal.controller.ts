//Middleware for handling exceptions 
import asyncHander from "express-async-handler";
import { Response, Request } from 'express';
//Goal Model Import
import Goal from '../models/goal.model';

// @desc Get Goals
// @route GET /api/goals
// @access Private
export const getGoals = asyncHander(async (req: Request, res: Response) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

// @desc Set Goal
// @route POST /api/goals
// @access Private
export const addGoal = asyncHander(async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Add A Text Field");
  }

  const goal = await Goal.create({
    text: req.body.text
  });

  res.status(200).json(goal);
});

// @desc Update Goal
// @route PUT /api/goals/:id
// @access Private
export const updateGoal = asyncHander(async (req: Request, res: Response) => {
  // find goal with req.params id
  const goal = await Goal.findById(req.params.id)
  //if the goal does not exist return status 400 with an error letting one know a goal was not found
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  // if parameters are passed, mongoose will update infomation 
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
  // respond with status 200 and updated infomation 
  res.status(200).json(updatedGoal);
});

// @desc Delete Goal
// @route DELETE /api/goals/:id
// @access Private
export const deleteGoal = asyncHander(async (req: Request, res: Response) => {
  // find goal with req.params id
  const goal = await Goal.findById(req.params.id)
  //if the goal does not exist return status 400 with an error letting one know a goal was not found
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
//Remove Goal
  await goal.remove()
//Return Id of returned param
  res.status(200).json({ id: req.params.id })
});
