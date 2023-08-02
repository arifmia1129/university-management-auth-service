import User from './user.model'

export const getLastId = async (): Promise<string | null> => {
  const lastId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return lastId?.id ? lastId.id : (0).toString().padStart(5, '0')
}

export const generateId = async () => {
  const lastId: string = (await getLastId()) as string
  const convertToNumber = Number(lastId)

  return (convertToNumber + 1).toString()
}
