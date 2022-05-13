import { Dispatch, ReactNode } from 'react'

import { EquipamentProps } from '../types/Equipament'
import { UserProps } from '../types/User'

export interface AuthProps {
  token: string
  user: UserProps
}

export interface Action {
  type: string
  payload: any
}

export interface State {
  auth: AuthProps
  equipaments: EquipamentProps[]
  users: UserProps[]
}

export interface GlobalStateProps {
  equipaments: EquipamentProps
  auth: AuthProps
  users: UserProps
}

export interface DataProviderProps {
  children: ReactNode
}
export interface GlobalContextProps {
  state: GlobalStateProps
  dispatch: Dispatch<Action>
}
