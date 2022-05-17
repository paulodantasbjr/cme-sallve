import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { toast } from 'react-toastify'
import { PatchToastHelper } from '../utils/ToastHelper'

interface ModalPasswordProps {
  handleClose: () => void
  userId: string
}

export const ModalPassword = ({ handleClose, userId }: ModalPasswordProps) => {
  const initialState = {
    password: '',
    confirmPassword: '',
  }
  const [passwordData, setPasswordData] = useState(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData({ ...passwordData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (passwordData.password === '' || passwordData.confirmPassword === '')
      return toast.error('Os campos não podem ser vazios!')

    if (passwordData.password.length < 6)
      return toast.error('A senha deve ter no mínimo 6 caracteres')

    if (passwordData.password !== passwordData.confirmPassword)
      return toast.error('As senhas não conferem')

    await PatchToastHelper(`user/resetPassword/${userId}`, {
      password: passwordData.password,
    })
    handleClose()
  }

  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="flex w-96 flex-col gap-4 rounded-lg bg-white p-4"
      >
        <div className="flex cursor-pointer justify-end">
          <MdClose onClick={handleClose} />
        </div>
        <div className="mx-4">
          <label
            htmlFor="password"
            className=" block text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            Nova Senha
          </label>

          <input
            id="password"
            name="password"
            value={passwordData.password}
            onChange={handleChange}
            type="password"
            className="w-full border-b border-gray-300 p-1 text-lg font-medium text-gray-900 dark:text-white"
          />
        </div>

        <div className="mx-4">
          <label
            htmlFor="confirmPassword"
            className=" block text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            Confirmar nova senha
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            type="password"
            className="w-full border-b border-gray-300 p-1 text-lg font-medium text-gray-900 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-fuchsia-400 px-5 py-2.5 text-center text-sm font-medium uppercase text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-400 dark:bg-fuchsia-400 dark:hover:bg-fuchsia-400 dark:focus:ring-fuchsia-400"
        >
          SALVAR
        </button>
      </form>
    </div>
  )
}
