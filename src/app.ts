import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running successfully',
  })
})

export default app
