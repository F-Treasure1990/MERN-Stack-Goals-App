import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../Store/slices/Goals/Goals.Slice'

type GoalState = {
  __v: number
  _id: string
  createdAt: string
  text: string
  updatedAt: string
  user: string
}

export default function({ goal }: { goal: GoalState }) {
  const dispatch = useDispatch()
  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        X
      </button>
    </div>
  )
}

