const prefix = 'zauth.mutedchaos.com'

export const internalPermissions = {
  tenant: {
    get: `${prefix}/tenant/get`,
  },
  application: {
    openid: {
      login: `${prefix}/application/openid/login`,
    },
  },
}
