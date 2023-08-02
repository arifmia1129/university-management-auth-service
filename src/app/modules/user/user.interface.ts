import { HydratedDocument, Model } from 'mongoose'

export type IUser = {
  id: string
  role: string
  password: string
}

export type IUserMethods = {
  fullName(): string
}

export type UserModel = {
  createWithFullName(
    name: string,
  ): Promise<HydratedDocument<IUser, IUserMethods>>
} & Model<IUser, object, IUserMethods>
