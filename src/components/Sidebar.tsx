import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { useContext } from 'react'

import { HiChartPie, HiLogout, HiUser, HiClipboardList } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { GlobalContext } from '../store/GlobalStore'

export const Sidebar = () => {
  const { state, dispatch } = useContext(GlobalContext)

  const handleLogout = () => {
    Cookies.remove('refreshToken', { path: 'api/auth/accessToken' })
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    toast.success('Desconectado realizado com sucesso!')
    return Router.push('/login')
  }
  return (
    <aside className="w-64  shadow-lg">
      <nav className="relative h-full rounded bg-white py-4 px-3 dark:bg-gray-800">
        <Link href="/">
          <a className="block text-center ">
            <Image
              src="/logo.gif"
              height={100}
              width={100}
              objectFit="contain"
              alt="logo"
            />
          </a>
        </Link>

        <ul className="space-y-2">
          <li>
            <Link href="/">
              <a className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-lime-200 dark:text-white dark:hover:bg-gray-700">
                <HiChartPie className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                <span className="ml-3">Dashboard</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/inventory">
              <a className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-lime-200 dark:text-white dark:hover:bg-gray-700">
                <HiClipboardList className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                <span className="ml-3">Inventario</span>
              </a>
            </Link>
          </li>
          {state.auth.user?.role === 'adm' && (
            <li>
              <Link href="/user">
                <a className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-lime-200 dark:text-white dark:hover:bg-gray-700">
                  <HiUser className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3">Usuarios</span>
                </a>
              </Link>
            </li>
          )}
        </ul>
        <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
          <li>
            <button
              onClick={handleLogout}
              className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-lime-200 dark:text-white dark:hover:bg-gray-700"
            >
              <HiLogout className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />

              <span className="ml-4">Sair</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
