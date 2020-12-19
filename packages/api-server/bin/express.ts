import 'dotenv/config'
import 'reflect-metadata'

import { createApp } from '../src/app'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { connectToDatabase } from '../src/db'
import { resolvers } from '../src/gql/resolvers'

async function run() {
  await connectToDatabase()

  const schema = await buildSchema({
    resolvers,
  })
  const server = new ApolloServer({ schema })
  const app = createApp(server)
  app.listen(3000)

  console.log('Ready to accept connections.')
}

run().catch((err) => {
  if (err.details) console.error(err.details)
  console.error(err.stack ?? err.message ?? err ?? 'Unknown error')
  process.exit(55)
})
