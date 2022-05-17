import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { GlobalContext } from '../store/GlobalStore'
import { PatchToastHelper } from '../utils/ToastHelper'
import { ModalPassword } from './ModalPassword'

interface ModalProps {
  handleClose: () => void
}

export const ModalUser = ({ handleClose }: ModalProps) => {
  const { state, dispatch } = useContext(GlobalContext)

  const initialState = {
    name: state.users.name ? state.users.name : '',
    email: state.users.email ? state.users.email : '',
    role: state.users.role ? state.users.role : '',
  }
  const [userData, setUserData] = useState(initialState)
  const [isModalPassword, setIsModalPassword] = useState(false)

  const router = useRouter()

  const handleModalPassword = () => {
    setIsModalPassword(!isModalPassword)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await PatchToastHelper(`user/${state.users._id}`, userData)

    dispatch({
      type: 'AUTH',
      payload: {
        ...state.auth,
        user: {
          ...state.auth.user,
          name: userData.name,
          email: userData.email,
        },
      },
    })
    router.push('/user')
    handleClose()
  }

  return (
    <>
      <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black/50">
        <form
          className="flex w-96 flex-col gap-4 rounded-lg bg-neutral-100 p-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-2xl font-bold uppercase">
            Editar usuário
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col">
              <label
                className="text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="name"
              >
                Nome
              </label>
              <input
                className="w-full rounded border border-gray-200 bg-gray-50 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="name"
                type="text"
                required
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Priscila Rodrigues"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label
                className="text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full rounded border border-gray-200 bg-gray-50 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="email"
                type="email"
                required
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="priscila@cme.com"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label
                className="text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="role"
              >
                Cargo
              </label>
              <select
                required
                name="role"
                value={userData.role}
                onChange={handleChange}
                className="w-full rounded border border-gray-200 bg-gray-50 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="role"
              >
                <option className="uppercase">Selecione</option>
                <option className="uppercase" value="adm">
                  adm
                </option>
                <option className="uppercase" value="user">
                  user
                </option>
              </select>
            </div>
            <div className=" flex items-center justify-between">
              <button
                onClick={handleClose}
                type="button"
                className="rounded-lg border border-fuchsia-400 px-5 py-1.5 text-center text-sm font-medium uppercase text-fuchsia-400 hover:border-fuchsia-800 hover:bg-fuchsia-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-fuchsia-400 dark:border-fuchsia-400 dark:text-blue-500 dark:hover:bg-fuchsia-600 dark:hover:text-white dark:focus:ring-fuchsia-800"
              >
                cancelar
              </button>

              <button
                type="submit"
                className="rounded-lg bg-fuchsia-400 px-5 py-1.5 text-center text-sm font-medium uppercase text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-400 dark:bg-fuchsia-400 dark:hover:bg-fuchsia-400 dark:focus:ring-fuchsia-400"
              >
                Atualizar
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={handleModalPassword}
            className="w-full rounded-md p-2 uppercase hover:bg-lime-200"
          >
            trocar senha?
          </button>
        </form>
      </div>
      {isModalPassword && (
        <ModalPassword
          handleClose={handleModalPassword}
          userId={state.users._id}
        />
      )}
    </>
  )
}
