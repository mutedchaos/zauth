import { Repository } from 'typeorm'
import { getConnection } from './index'

export function createRepositoryProxy<T>(entity: Constructable<T>): Repository<T> {
  /**/
  return new Proxy(
    {
      repository: null as any,
    },
    {
      get(obj, prop) {
        if (prop === 'repository') return null
        if (!obj.repository) {
          obj.repository = getConnection().getRepository(entity)
        }
        return obj.repository![prop]
      },

      set(_obj, prop) {
        throw new Error('Cannot set ' + prop.toString())
      },
    }
  ) as any
}
type Constructable<T> = {
  new (): T
}
