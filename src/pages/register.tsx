import type { NextPage } from 'next'
import Head from 'next/head'

import { IoMdArrowBack } from 'react-icons/io'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { valid } from '../utils/Valid'
import { toast } from 'react-toastify'
import { postData } from '../services'
import { useRouter } from 'next/router'
import { GlobalContext } from '../store/GlobalStore'

const Register: NextPage = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }
  const [userData, setuserData] = useState(initialState)

  const { state } = useContext(GlobalContext)

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setuserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errMsg = valid(
      userData.email,
      userData.password,
      userData.name,
      userData.passwordConfirmation
    )
    if (errMsg) return toast.error(errMsg)

    const id = toast.loading('Carregando...')
    const result = await postData('auth/register', userData)
    if (result.success) {
      toast.update(id, {
        render: result.success,
        type: 'success',
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      })
      router.push('/login')
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

  useEffect(() => {
    if (state.auth.token) router.push('/')
  }, [router, state.auth.token])

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex h-screen w-screen items-center justify-center bg-lime-200">
        <form
          className="rounded-lg bg-white p-8 shadow-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <Link href="/login">
              <a>
                <IoMdArrowBack className="cursor-pointer hover:text-fuchsia-400" />
              </a>
            </Link>
          </div>
          <div className="mb-6 text-center">
            <h1 className=" text-4xl text-fuchsia-400">CME</h1>
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={userData.name}
              onChange={handleChange}
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Priscila Rodrigues"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              onChange={handleChange}
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="priscila@cme.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={userData.password}
              onChange={handleChange}
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="repeat-password"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Confirmar senha
            </label>
            <input
              type="password"
              id="repeat-password"
              name="passwordConfirmation"
              value={userData.passwordConfirmation}
              onChange={handleChange}
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="rounded-lg bg-fuchsia-400 px-5 py-2.5 text-center text-sm font-medium uppercase text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-400 dark:bg-fuchsia-400 dark:hover:bg-fuchsia-400 dark:focus:ring-fuchsia-400"
            >
              Cadastrar nova conta
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
