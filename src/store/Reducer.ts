import { ACTIONS } from './Actions'
import { Action, State } from './store.types'

export const reducers = (state: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      }
    case ACTIONS.INVENTORY:
      return {
        ...state,
        inventory: action.payload,
      }
    case ACTIONS.USER:
      return {
        ...state,
        users: action.payload,
      }
    case ACTIONS.EQUIPAMENT:
      return {
        ...state,
        equipament: action.payload,
      }
    default:
      return state
  }
}
