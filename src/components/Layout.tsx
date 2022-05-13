import { useContext, useEffect } from 'react'

import { useRouter } from 'next/router'

import { GlobalContext } from '../store/GlobalStore'
import { LayoutProps } from '../types/Layout'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { state } = useContext(GlobalContext)

  useEffect(() => {
    if (!state.auth.token) router.push('/login')
  }, [router, state.auth])

  return (
    <div className="flex h-screen w-screen bg-neutral-100 ">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  )
}
