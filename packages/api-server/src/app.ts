import bodyParser from 'body-parser'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'

export function createApp(apolloServer: ApolloServer) {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  apolloServer.applyMiddleware({ app })
  return app
}
