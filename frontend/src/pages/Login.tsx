import { useState, useEffect } from 'react'
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../Store/slices/Auth/Auth.Slice'
import { RootState } from '../Store/store'
import Spinner from '../Components/Spinner'

interface FormData {
  email: string,
  password: string,
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userData = {
      email,
      password
    }
    //@ts-ignore
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          Login <FaSignInAlt />
        </h1>
        <p>Login & Start Setting Goals</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter Email' onChange={onChange} />
          </div>
          <div className='form-group'>
            <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter Password' onChange={onChange} />
          </div>
          <div className='form-group'>
            <button className='btn btn-block' type='submit'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

