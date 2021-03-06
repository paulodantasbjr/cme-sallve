import { Id, toast } from 'react-toastify'

import { deleteData, postData, putData, patchData, getData } from '../services'

const infoMsg = (id: Id, result: any) => {
  if (result.success) {
    return toast.update(id, {
      render: result.success,
      type: 'success',
      isLoading: false,
      autoClose: 1000,
      closeButton: true,
    })
  }
  if (result.error) {
    return toast.update(id, {
      render: result.error,
      type: 'error',
      isLoading: false,
      autoClose: 1000,
      closeButton: true,
    })
  }
}

export const GetToastHelper = async (url: string) => {
  const result = await getData(url)
  if (result.error) {
    return toast.error(result.error)
  }

  return result
}

export const DeleteToastHelper = async (url: string) => {
  const id = toast.loading('Carregando...')
  const result = await deleteData(url)

  infoMsg(id, result)
}

export const PostToastHelper = async (url: string, data: any) => {
  const id = toast.loading('Carregando...')
  const result = await postData(url, data)

  infoMsg(id, result)

  return result
}

export const PutToastHelper = async (url: string, data: any) => {
  const id = toast.loading('Carregando...')
  const result = await putData(url, data)

  infoMsg(id, result)
}

export const PatchToastHelper = async (url: string, data: any) => {
  const id = toast.loading('Carregando...')
  const result = await patchData(url, data)

  infoMsg(id, result)
}
