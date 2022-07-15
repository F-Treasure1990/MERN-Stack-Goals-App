import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './slices/Auth/Auth.Slice'
import GoalReducer from './slices/Goals/Goals.Slice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    goals: GoalReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
