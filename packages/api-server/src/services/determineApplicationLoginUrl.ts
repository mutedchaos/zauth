import authorize from '../authorize'
import { applications } from '../db/Application'
import { tenants } from '../db/Tenant'
import { env } from '../env'
import NotFoundError from '../errors/NotFoundError'
import { internalPermissions } from '../internalPermissions'

export default async function determineApplicationLoginUrl(applicationId: string): Promise<string> {
  const application = await applications.findOne(applicationId)
  if (!application) throw new NotFoundError('Invalid client id ' + applicationId)

  await authorize(
    { sub: applicationId, jti: '' },
    { tenant: application.tenantId, application: application.id },
    internalPermissions.application.openid.login
  )

  if (application.openIDLoginURL) return fixURL(application.openIDLoginURL)

  const tenant = await tenants.findOneOrFail(application.tenant)

  if (tenant.openIDLoginURL) return fixURL(tenant.openIDLoginURL)

  return fixURL(env.defaultOpenIDLoginUrl)

  function fixURL(url: string) {
    return url.replace(/%TENANT_ID%/g, application!.tenantId).replace(/%APPLICATION_ID%/g, application!.id)
  }
}
