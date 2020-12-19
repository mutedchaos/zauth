import { ClientToken } from './ClientToken'

interface AuthContext {
  tenant: string
  application?: string
}

export default function authorize(_client: ClientToken, _context: AuthContext, _permission: string) {}
