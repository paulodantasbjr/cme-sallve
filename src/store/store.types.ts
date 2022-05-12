import { Dispatch, ReactNode } from 'react'
import { UserProps } from '../types/User'

export interface AuthProps {
  token: string
  user: UserProps
}

export interface Action {
  type: string
  payload: AuthProps | any
}

export interface State {
  auth: AuthProps
  equipaments: string
}

export interface GlobalStateProps {
  equipaments: string
  auth: AuthProps
}

export interface DataProviderProps {
  children: ReactNode
}
export interface GlobalContextProps {
  state: GlobalStateProps
  dispatch: Dispatch<Action>
}
