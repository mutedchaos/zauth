import 'dotenv/config'

import { createApp } from '../src/app'

async function run() {
  const app = createApp()
  app.listen(3000)

  console.log('Ready to accept connections.')
}

run().catch((err) => {
  if (err.details) console.error(err.details)
  console.error(err.stack ?? err.message ?? err ?? 'Unknown error')
  process.exit(55)
})
