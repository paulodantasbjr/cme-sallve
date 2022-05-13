import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

export const onLogout = () => {
  Cookies.remove('refreshToken', { path: 'api/auth/accessToken' })
  localStorage.removeItem('firstLogin')

  toast.success('Desconectado realizado com sucesso!')
  return { type: 'AUTH', payload: {} }
}
