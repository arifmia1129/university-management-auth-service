import { RequestHandler } from 'express'
import * as userService from './user.service'

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.createUserService(req.body)

    res.status(201).json({
      success: true,
      message: 'Successfully created user',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
