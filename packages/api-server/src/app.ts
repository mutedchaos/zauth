import './apis/index'

import bodyParser from 'body-parser'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { apiRouter } from './apis/index'
import cors from 'cors'
import yaml from 'yaml'

export function createApp(apolloServer: ApolloServer) {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  const yamlTypes = ['application/yaml', 'application/x-yaml', 'text/yaml', 'text/x-yaml']
  app.use(bodyParser.text({ type: yamlTypes }))
  app.use((req, _res, next) => {
    if (yamlTypes.some(type => req.headers['content-type']?.includes(type))) {
      req.body = yaml.parse(req.body)
    } else {
      next()
    }
  })
  apolloServer.applyMiddleware({ app })

  app.use(apiRouter)

  return app
}
