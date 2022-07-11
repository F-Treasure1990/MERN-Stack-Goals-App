import { Response, Request, NextFunction } from "express";

type ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => any;

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
};
export default errorHandler
