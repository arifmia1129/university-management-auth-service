import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, infoLogger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.db_url as string)
    infoLogger.info('DB Connected!')

    app.listen(config.port, () => {
      infoLogger.info(`Application is listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }
}

main()
