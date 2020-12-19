import { Router as router } from 'express'
import { API } from '@vicion/zauth-api'
import yamlOutput from './middleware/yamlOutput'

export const apiRouter = router()

API.base.configure({
  router: apiRouter,
  autoImplementAllAPIs: true,
  inherentMiddleware: [yamlOutput],
})
