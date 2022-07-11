import jwt, { JwtPayload } from "jsonwebtoken"
import asyncHander from "express-async-handler"
import { Response, Request, NextFunction } from "express"
import User from '../models/user.model'

export interface RequestExtended extends Request {
  user :{
    id?:string
    name:string,
    email:string,
    password:string,
  }
}

export default asyncHander(async (req: RequestExtended, res: Response, next: NextFunction) => {
  let token:string

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header 
      token = req.headers.authorization.split(' ')[1]
      //verify token 
      const decoded:JwtPayload | string | any= jwt.verify(token, process.env.JWT_SECRET)
      //get user from the token  / excluding password
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not Authorised')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Not Authorised, No Token')
  }
})
