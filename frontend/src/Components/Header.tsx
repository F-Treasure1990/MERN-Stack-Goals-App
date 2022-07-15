import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { logout, reset } from '../Store/slices/Auth/Auth.Slice'

interface UserState {
    auth: {
        isError: boolean
        isLoading : boolean 
        isSuccess: boolean
        message :string 
        user : null | string
      }
  }


export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: UserState) => state.auth)

  const onLogout = () => {
    //@ts-ignore
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'><FaSignInAlt /> Sign In</Link>'
            </li>
            <li>
              <Link to='/register'><FaUser /> Register</Link>'
            </li>
          </>
        )}
      </ul>
    </header >
  )
}

