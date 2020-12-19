export const env = {
  defaultOpenIDLoginUrl: required('DEFAULT_OPEN_ID_LOGIN_URL'),
}

function required(param: string) {
  const value = process.env[param]
  if (!value) throw new Error('Environment variable ' + param + ' not provided')
  return value
}
