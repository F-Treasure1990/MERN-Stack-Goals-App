import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../Components/GoalForm'
import Spinner from '../Components/Spinner'
import { RootState } from '../Store/store'
import { getGoals, reset } from '../Store/slices/Goals/Goals.Slice'
import GoalItem from '../Components/GoalItem'

type UserState = {
  _id: string
  name: string
  email: string
  token: string
}

interface StoreState {
  auth: {
    isError: boolean
    isLoading: boolean
    isSuccess: boolean
    message: string
    user: UserState
  }
}

type GoalState = {
  __v: number
  _id: string
  createdAt: string
  text: string
  updatedAt: string
  user: string
}

export default function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state: StoreState) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state: RootState) => state.goals)

  //@ts-ignore
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    // @ts-ignore
    dispatch(getGoals())

    return () => { dispatch(reset()) }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) return <Spinner />
  return (
    <>
      <section className='headering'>
        <h1>Welcome {user && user.name}</h1>
        <p> Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal: GoalState) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

