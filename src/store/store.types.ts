import { Dispatch, ReactNode } from 'react'
import { AuthProps } from '../types/Auth'
import { EquipamentProps } from '../types/Equipament'

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
  equipament: EquipamentProps | any
}

export interface GlobalStateProps {
  auth: AuthProps
  inventory: InventoryProps
  users: UserProps
  equipament: EquipamentProps
}

export interface DataProviderProps {
  children: ReactNode
}
export interface GlobalContextProps {
  state: GlobalStateProps
  dispatch: Dispatch<Action>
}
