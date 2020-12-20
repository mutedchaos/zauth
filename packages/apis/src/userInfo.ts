import { base } from './base'

export const userInfoAPIs = {
  getUserInfo: base.declareGetAPI('/userInfo/v1').response<{
    sub: string
    givenName?: string
    familyName?: string
    phone?: string
    email?: string
    customFields: {
      [key: string]: string
    }
  }>(),
}
