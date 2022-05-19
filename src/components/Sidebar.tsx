import { useContext } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  HiChartPie,
  HiLogout,
  HiUser,
  HiClipboardList,
  HiDesktopComputer,
} from 'react-icons/hi'

import { GlobalContext } from '../store/GlobalStore'
import { onLogout } from '../utils/onLogout'

export const Sidebar = () => {
  const { state, dispatch } = useContext(GlobalContext)

  const router = useRouter()

  const isActive = (path: string) => {
    return router.pathname === path ? 'bg-lime-200' : ''
  }

  const handleLogout = () => {
    dispatch(onLogout())
    return router.push('/login')
  }

  return (
    <aside className="w-64 shadow-lg">
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
              <a
                className={`${isActive(
                  '/'
                )} flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-lime-100 dark:text-white dark:hover:bg-gray-700`}
              >
                <HiChartPie className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                <span className="ml-3">Dashboard</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/inventory">
              <a
                className={`${isActive(
                  '/inventory'
                )} flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-lime-100 dark:text-white dark:hover:bg-gray-700`}
              >
                <HiClipboardList className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                <span className="ml-3">Inventário</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/equipament">
              <a
                className={`${isActive(
                  '/equipament'
                )} flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-lime-100 dark:text-white dark:hover:bg-gray-700`}
              >
                <HiDesktopComputer className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                <span className="ml-3">Equipamento</span>
              </a>
            </Link>
          </li>
          {state.auth.user?.role === 'ADM' && (
            <li>
              <Link href="/user">
                <a
                  className={`${isActive(
                    '/user'
                  )} flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-lime-100 dark:text-white dark:hover:bg-gray-700`}
                >
                  <HiUser className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3">Usuários</span>
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
