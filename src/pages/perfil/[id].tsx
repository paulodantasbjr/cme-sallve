import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { Layout } from '../../components/Layout'
import { ModalPassword } from '../../components/ModalPassword'

import { GlobalContext } from '../../store/GlobalStore'
import { PatchToastHelper } from '../../utils/ToastHelper'

const Perfil: NextPage = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const initialState = {
    email: state.auth.user?.email ? state.auth.user?.email : '',
    name: state.auth.user?.name ? state.auth.user?.name : '',
    role: state.auth.user?.role,
  }
  const [userData, setUserData] = useState(initialState)
  const [isOpenModalPassword, setIsOpenModalPassword] = useState(false)

  const handleOpenModalPassword = () => {
    setIsOpenModalPassword(!isOpenModalPassword)
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

    if (userData.email === '' || userData.name === '') {
      return toast.error('Os campos não podem ser vazios!')
    }

    await PatchToastHelper(`user/${state.auth.user._id}`, userData)

    dispatch({
      type: 'AUTH',
      payload: {
        ...state.auth,
        user: {
          ...state.auth.user,
          name: userData.name,
        },
      },
    })
  }

  return (
    <>
      <Head>
        <title>CME - perfil</title>
      </Head>
      <Layout>
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-4 ">
              <div className="flex flex-col items-center">
                <Image
                  src={state.auth.user?.avatar || '/default-user-image.png'}
                  alt="img perfil"
                  height={96}
                  width={96}
                  className="rounded-full shadow-lg"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  CARGO: {state.auth.user?.role}
                </span>
              </div>
              <div className="p-1">
                <label
                  htmlFor="name"
                  className=" block text-xs font-medium text-gray-900 dark:text-gray-300"
                >
                  Nome
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full border-b border-gray-300  text-sm font-light text-gray-900 dark:text-white"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="p-1">
                <label
                  htmlFor="email"
                  className=" block text-xs font-medium text-gray-900 dark:text-gray-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  className="w-full cursor-not-allowed border-b border-gray-300 text-sm font-light text-gray-900 dark:text-white"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-fuchsia-400 px-5 py-2.5 text-center text-sm font-medium uppercase text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-400 dark:bg-fuchsia-400 dark:hover:bg-fuchsia-400 dark:focus:ring-fuchsia-400"
              >
                SALVAR
              </button>
            </form>
            <button
              onClick={handleOpenModalPassword}
              className="w-full rounded-md p-2 uppercase hover:bg-lime-200"
            >
              trocar senha?
            </button>
          </div>
        </div>
      </Layout>
      {isOpenModalPassword && (
        <ModalPassword
          userId={state.auth.user?._id}
          handleClose={handleOpenModalPassword}
        />
      )}
    </>
  )
}

export default Perfil
