import { Request, Response } from 'express'
import * as userService from './user.service'

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserService(req.body)
    res.status(201).json({
      success: true,
      message: 'Successfully created user',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create new user',
    })
  }
}
