import { useContext, useState } from 'react'

import Image from 'next/image'

import { GlobalContext } from '../store/GlobalStore'
import Link from 'next/link'
import { MdClose } from 'react-icons/md'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { state } = useContext(GlobalContext)

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header className="flex h-16 items-center justify-end bg-white shadow-lg">
        <div className="relative mr-4 flex flex-row-reverse items-center gap-2">
          <Image
            onClick={handleMenu}
            className="cursor-pointer rounded-full"
            src={state.auth.user?.avatar || '/default-user-image.png'}
            width={42}
            height={42}
            alt={state.auth.user?.name}
          />
          {isMenuOpen && (
            <div className="absolute right-0 top-8 z-50 min-w-[6rem] rounded-md bg-white p-2 shadow-2xl">
              <div className="flex flex-col items-end gap-2">
                <MdClose
                  onClick={handleMenu}
                  className="h-3 w-3 cursor-pointer"
                />
                <Link href={`/perfil/${state.auth.user?._id}`}>
                  <a className="rounded-md p-2 text-xs uppercase text-gray-800 hover:bg-lime-300 ">
                    Ver Perfil
                  </a>
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-col items-end ">
            <span className="text-xs font-medium uppercase ">
              {state.auth.user?.name}
            </span>
            <span className="text-xs uppercase text-gray-500">
              {state.auth.user?.role}
            </span>
          </div>
        </div>
      </header>
    </>
  )
}
