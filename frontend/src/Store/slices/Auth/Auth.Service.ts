import axios from 'axios'

const API_URL = 'http://localhost:8000/api/users/'

export type UserData = {
  name: string
  email: string
  password: string
}
//Register USER 
const register = async (userData: UserData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//Login USER 
const login= async (userData: UserData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}


//Logout User
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login
}
export default authService

