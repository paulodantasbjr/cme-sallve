import { toast } from 'react-toastify'
import { deleteData } from '../services'

export const DeleteToastHelper = async (url: string) => {
  const id = toast.loading('Carregando...')
  const result = await deleteData(url)
  if (result.success) {
    toast.update(id, {
      render: result.success,
      type: 'success',
      isLoading: false,
      autoClose: 1000,
      closeButton: true,
    })
  }
  if (result.error) {
    toast.update(id, {
      render: result.error,
      type: 'error',
      isLoading: false,
      autoClose: 1000,
      closeButton: true,
    })
  }
}
