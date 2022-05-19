import { createContext, useEffect, useReducer } from 'react'
import { GetToastHelper } from '../utils/ToastHelper'
import { reducers } from './Reducer'
import { DataProviderProps, GlobalContextProps } from './store.types'

export const GlobalContext = createContext({} as GlobalContextProps)

export const DataProvider = ({ children }: DataProviderProps) => {
  const initialState = {
    auth: {},
    inventory: {},
    users: {},
  }
  const [state, dispatch] = useReducer(reducers, initialState)

  const fetchUser = async () => {
    const firstLogin = window.localStorage.getItem('firstLogin')
    if (firstLogin) {
      const result = await GetToastHelper('auth/accessToken')

      dispatch({
        type: 'AUTH',
        payload: {
          token: result.accessToken,
          user: result.user,
        },
      })
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
