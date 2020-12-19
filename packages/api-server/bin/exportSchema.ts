import 'dotenv/config'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import * as fs from 'fs'
import { printSchema } from 'graphql'

import { resolvers } from '../src/gql/resolvers'

async function run() {
  const schema = await buildSchema({
    resolvers,
  })

  await fs.promises.writeFile(__dirname + '/../lib/schema.graphql', printSchema(schema), 'utf-8')
}

run().catch((err) => {
  console.error(err.stack ?? err.message ?? err ?? 'Unknown error')
  process.exit(55)
})
