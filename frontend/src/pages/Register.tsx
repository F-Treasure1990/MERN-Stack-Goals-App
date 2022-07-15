import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa"
import { register, reset } from '../Store/slices/Auth/Auth.Slice'
import { RootState } from '../Store/store'
import Spinner from '../Components/Spinner'

interface FormData {
  name: string,
  email: string,
  password: string,
  password2: string
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData
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

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name: name.trim(), email:email.trim(), password
      }
      // @ts-ignore
      dispatch(register(userData))
    }
  }


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create a new account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input type="text" className='form-control' name='name' id='name' value={name} placeholder='Enter Name' onChange={onChange} />
          </div>
          <div className='form-group'>
            <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter Email' onChange={onChange} />
          </div>
          <div className='form-group'>
            <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter Password' onChange={onChange} />
          </div>
          <div className='form-group'>
            <input type="password" className='form-control' id='password2' name='password2' value={password2} placeholder='Enter Password Again' onChange={onChange} />
          </div>
          <div className='form-group'>
            <button className='btn btn-block' type='submit'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

