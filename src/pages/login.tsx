import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { postData } from '../services'
import { GlobalContext } from '../store/GlobalStore'
import Cookies from 'js-cookie'

const Login: NextPage = () => {
  const initialState = {
    email: '',
    password: '',
  }
  const [userData, setUserData] = useState(initialState)

  const router = useRouter()

  const { state, dispatch } = useContext(GlobalContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const id = toast.loading('Carregando...')
    const result = await postData('auth/login', userData)

    if (result.success) {
      toast.update(id, {
        render: result.success,
        type: 'success',
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      })
      Cookies.set('refreshToken', result.refreshToken, {
        path: 'api/auth/accessToken',
        expires: 7,
      })

      dispatch({
        type: 'AUTH',
        payload: {
          token: result.accessToken,
          user: result.user,
        },
      })

      window.localStorage.setItem('firstLogin', 'true')
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
  }, [router, state.auth])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex h-screen w-screen items-center justify-center bg-lime-200">
        <form
          className="rounded-lg bg-white p-8 shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-6 text-center">
            <h1 className=" text-4xl text-fuchsia-400">CME</h1>
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
              id="email"
              name="email"
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
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2 text-center">
            <button
              type="submit"
              className="rounded-lg bg-fuchsia-400 px-5 py-2.5 text-center text-sm font-medium uppercase text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-400 dark:bg-fuchsia-400 dark:hover:bg-fuchsia-400 dark:focus:ring-fuchsia-400"
            >
              ENTRAR
            </button>
            <Link href="/register">
              <a className="flex items-center justify-center gap-2 text-xs">
                Não possui conta?
                <span className="hover:text-fuchsia-400 hover:underline">
                  Registre-se
                </span>
              </a>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
