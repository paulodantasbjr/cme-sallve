import { useContext, useState } from 'react'

import Image from 'next/image'

import { AiOutlinePlus } from 'react-icons/ai'

import { GlobalContext } from '../store/GlobalStore'
import { Modal } from './Modal'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { state } = useContext(GlobalContext)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <header
        className={`flex h-16 items-center ${
          state.auth.user?.role === 'adm' ? 'justify-between' : 'justify-end'
        }  bg-white shadow-lg`}
      >
        {state.auth.user?.role === 'adm' && (
          <button
            onClick={handleClick}
            className="ml-4 flex items-center justify-center gap-1 rounded-lg bg-fuchsia-400 p-2 text-sm font-normal uppercase text-white transition duration-75 hover:bg-fuchsia-600 dark:text-white dark:hover:bg-gray-700 "
          >
            <AiOutlinePlus className="text-white" />
            Novo equipamento
          </button>
        )}
        <div className="relative mr-4 flex flex-row-reverse items-center gap-2">
          <Image
            className="rounded-full"
            src={state.auth.user?.avatar || '/default-user-image.png'}
            width={32}
            height={32}
            alt={state.auth.user?.name}
          />
          <div className="flex flex-col ">
            <span className="text-xs uppercase">{state.auth.user?.name}</span>
            <span className="text-center text-xs uppercase">
              {state.auth.user?.role}
            </span>
          </div>
        </div>
      </header>
      {isOpen && <Modal handleClose={handleClick} />}
    </>
  )
}
