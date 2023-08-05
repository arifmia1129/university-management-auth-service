import { HydratedDocument, Model } from 'mongoose'

export type IUser = {
  id: string
  role: 'student' | 'admin' | 'faculty'
  password: string
}

export type IUserMethods = {
  fullName(): string
}

export type UserModel = {
  createWithFullName(): Promise<HydratedDocument<IUser, IUserMethods>>
  // name: string,
} & Model<IUser, object, IUserMethods>
