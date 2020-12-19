import { authorizeAPI } from './authorize'
import { base } from './base'
import { userInfoAPIs } from './userInfo'

export const API = {
  base,
  userInfo: userInfoAPIs,
  authorize: authorizeAPI,
}
