import { useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa"

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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

