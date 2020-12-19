import { useEffect, useState } from 'react'
import { AwaitedType } from '../types'

export function useGetFromAPI<TAPI extends (arg: any) => Promise<any>>(api: TAPI, args: Parameters<TAPI>[0]) {
  const [data, setData] = useState<null | AwaitedType<ReturnType<TAPI>> | Error>(null)

  useEffect(() => {
    let isLatest = true
    api(args).then(
      (result) => {
        if (isLatest) setData(result)
      },
      (err: unknown) => {
        if (isLatest) {
          if (err instanceof Error) setData(err)
          else {
            const error = Object.assign(new Error(JSON.stringify(err)), { origin: err })
            setData(error)
          }
        }
      }
    )
    return () => {
      isLatest = false
    }
  }, [api, JSON.stringify(args)])

  if (data instanceof Error) {
    throw data
  }

  return data
}
