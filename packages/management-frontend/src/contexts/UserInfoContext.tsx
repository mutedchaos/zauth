import { API } from '@vicion/zauth-api'
import React, { ReactNode } from 'react'
import { Loading } from '../commonComponents/Loading'
import { HttpError } from '../fetchAdapter'
import { useGetFromAPI } from '../hooks/useGetFromAPI'
import AuthenticatePage from '../pages/AuthorizePage/AuthenticatePage'

type Ctx = typeof API.userInfo.getUserInfo.ResponseType

export const userInfoContext = React.createContext<Ctx>(null as any)

interface Props {
  children: ReactNode
}

export function UserInfoProvider({ children }: Props) {
  try {
    const userInfo = useGetFromAPI(API.userInfo.getUserInfo, {})

    if (!userInfo) return <Loading />

    return <userInfoContext.Provider value={userInfo}>{children}</userInfoContext.Provider>
  } catch (err) {
    if (err instanceof HttpError && err.status === 401) {
      return <AuthenticatePage />
    }
    throw err
  }
}
