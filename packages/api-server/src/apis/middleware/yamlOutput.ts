import identity from 'lodash/identity'
import yaml from 'yaml'
import { PapupataMiddleware } from 'papupata'

export default identity<PapupataMiddleware>(async function yamlOutput(req, _res, _route, next) {
  const output = await next()
  if (req.headers.accept?.includes('yaml') && typeof output === 'object') {
    return yaml.stringify(output)
  }
})
