import { base } from './base'

export const userInfoAPIs = {
  getUserInfo: base.declareGetAPI('/userInfo/v1').response<{
    id: string
    name: string
  }>(),
}
