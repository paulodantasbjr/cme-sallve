import { Dispatch, ReactNode } from 'react'
import { AuthProps } from '../types/Auth'

import { EquipamentProps } from '../types/Equipament'
import { UserProps } from '../types/User'

export interface Action {
  type: string
  payload: any
}

export interface State {
  auth: AuthProps | any
  equipaments: EquipamentProps | any
  users: UserProps | any
}

export interface GlobalStateProps {
  auth: AuthProps
  equipaments: EquipamentProps
  users: UserProps
}

export interface DataProviderProps {
  children: ReactNode
}
export interface GlobalContextProps {
  state: GlobalStateProps
  dispatch: Dispatch<Action>
}
