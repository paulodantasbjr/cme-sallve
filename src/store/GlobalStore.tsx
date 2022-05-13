import { createContext, useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import { getData } from '../services'
import { reducers } from './Reducer'
import { DataProviderProps, GlobalContextProps } from './store.types'

export const GlobalContext = createContext({} as GlobalContextProps)

export const DataProvider = ({ children }: DataProviderProps) => {
  const initialState = {
    auth: {},
    equipaments: {},
    users: {},
  }
  const [state, dispatch] = useReducer(reducers, initialState)

  const fetchUser = async () => {
    const firstLogin = window.localStorage.getItem('firstLogin')
    if (firstLogin) {
      const result = await getData('auth/accessToken')

      if (result.success) {
        dispatch({
          type: 'AUTH',
          payload: {
            token: result.accessToken,
            user: result.user,
          },
        })
      }

      if (result.error) {
        toast.error(result.error)
      }
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
