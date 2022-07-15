import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import goalService from './Goal.Service'

interface GoalsState {
  goals: []
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

const initialState: GoalsState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const createGoal = createAsyncThunk('goals/create', async (goalData: { text: string }, thunkAPI) => {
  try {
    // @ts-ignore
    const token = thunkAPI.getState().auth.user.token
    return await goalService.createGoal(goalData, token)
  }
  catch (err: any) {
    const message = (err.response && err.response.data && err.response.data.message || err.message || err.toString())
    return thunkAPI.rejectWithValue(message)

  }
})

// Get User Goals
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
  try {
    // @ts-ignore
    const token = thunkAPI.getState().auth.user.token
    return await goalService.getGoals(token)
  }
  catch (err: any) {
    const message = (err.response && err.response.data && err.response.data.message || err.message || err.toString())
    return thunkAPI.rejectWithValue(message)
  }
})
// Delete user goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (id, thunkAPI) => {
    try {
      // @ts-ignore
      const token = thunkAPI.getState().auth.user.token
      return await goalService.deleteGoal(id, token)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, state => { state.isLoading = true })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // @ts-ignore
        state.goals.push(action.payload)
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        //@ts-ignore
        state.message = action.payload
      })
      .addCase(getGoals.pending, state => { state.isLoading = true })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // @ts-ignore
        state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        //@ts-ignore
        state.message = action.payload
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        )
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})


// Action creators are generated for each case reducer function
export const { reset } = goalsSlice.actions

export default goalsSlice.reducer
