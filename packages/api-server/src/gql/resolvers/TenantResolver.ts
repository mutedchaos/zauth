import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import authorize from '../../authorize'
import { ClientToken } from '../../ClientToken'
import { Tenant, tenants } from '../../db/Tenant'
import { internalPermissions } from '../../internalPermissions'

@Resolver(() => Tenant)
export class TenantResolver {
  @Query(() => Tenant)
  async tenant(@Arg('id') id: string, @Ctx('user') client: ClientToken) {
    await authorize(client, { tenant: id }, internalPermissions.tenant.get)
    return await tenants.findOneOrFail(id)
  }
}
