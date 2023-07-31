import mongoose from 'mongoose'
import app from './app'
import config from './config'

main().catch(err => console.log(err))

async function main() {
  await mongoose.connect(config.db_url as string)
  console.log('DB Connected!')

  app.listen(config.port, () => {
    console.log(`Application is listening on port ${config.port}`)
  })
}
