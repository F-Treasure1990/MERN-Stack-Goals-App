import { Response, Request } from 'express'
import bcrypt from 'bcryptjs'
import asyncHander from 'express-async-handler'
import User from '../models/user.model'
import generateToken from '../utils/genterateToken'
import { RequestExtended } from '../middleware/auth.middleware'

// @desc  Register a User
// @route GET /api/users
// @access Public 
export const registerUser = asyncHander(async (req: Request, res: Response) => {
  //Get user credentials from request body
  const { name, email, password } = req.body
  //check all feilds have been supplied
  if (!name || !password || !email) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // check if user already exists 
  const userExists = await User.findOne({ email })

  //if user already exists 
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  //Hash password 
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create user with hashed password
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invlid User Data')
  }
})

// @desc  Authenticate a User
// @route GET /api/users/login
// @access Public 
export const loginUser = asyncHander(async (req: Request, res: Response) => {
  //get email and password from login
  const { email, password } = req.body
  //Check if user exists
  const user = await User.findOne({ email })
  //Check password matches found user
  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invlid Credentials')
  }
})

// @desc Get User data
// @route GET /api/users/me
// @access Public 
export const getMe = asyncHander(async (req: RequestExtended, res: Response) => {
  res.status(200).json(req.user)
})


