import config from '../../../config'
import { IUser } from './user.interface'
import User from './user.model'

export const createUserService = async (
  userInfo: IUser,
): Promise<IUser | null> => {
  // if user don't give password use default password
  if (!userInfo.password) {
    userInfo.password = config.default_user_pass as string
  }

  const createdUser = await User.create(userInfo)

  if (!createdUser) {
    throw new Error('Failed to insert user information into database')
  }
  return createdUser
}
