import { ClientToken } from './ClientToken'

interface AuthContext {
  tenant: string
  application?: string
}

export default async function authorize(_client: ClientToken, _context: AuthContext, _permission: string) {}
