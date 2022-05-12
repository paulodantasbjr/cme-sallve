import { ACTIONS } from './Actions'
import { Action, State } from './store.types'

export const reducers = (state: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      }
    case ACTIONS.DELETE_EQUIPAMENT:
      return {
        ...state,
        equipaments: action.payload,
      }
    default:
      return state
  }
}
