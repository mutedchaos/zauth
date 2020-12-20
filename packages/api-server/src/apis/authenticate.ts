import { API } from '@vicion/zauth-api'
import determineApplicationLoginUrl from '../services/determineApplicationLoginUrl'
import qs from 'qs'

API.authorize.url.implement(async (req, res) => {
  const url = (await determineApplicationLoginUrl(req.query.client_id)) + '?' + qs.stringify(req.query)

  if (req.accepts('text/html')) {
    res.redirect(url)
    return undefined as any
  }
  return { url }
})
