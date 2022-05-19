import { Dispatch, ReactNode } from 'react'
import { AuthProps } from '../types/Auth'

import { InventoryProps } from '../types/Inventory'
import { UserProps } from '../types/User'

export interface Action {
  type: string
  payload: any
}

export interface State {
  auth: AuthProps | any
  inventory: InventoryProps | any
  users: UserProps | any
}

export interface GlobalStateProps {
  auth: AuthProps
  inventory: InventoryProps
  users: UserProps
}

export interface DataProviderProps {
  children: ReactNode
}
export interface GlobalContextProps {
  state: GlobalStateProps
  dispatch: Dispatch<Action>
}
