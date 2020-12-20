import { API } from '@vicion/zauth-api'
import pick from 'lodash/pick'

API.userInfo.getUserInfo.implement(async (req) => {
  const accessToken = req.session?.accessToken
  if (!accessToken) throw new Error('Access token is required')

  const applicationSession = await accessToken.applicationSession
  const user = await (await applicationSession.masterSession).user

  return {
    sub: user.id,
    ...pick(user, applicationSession.scopedProfileFields),
    customFields: pick(user.customFields, applicationSession.scopedCustomFields),
  }
})
