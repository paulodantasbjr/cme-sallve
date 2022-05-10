import Image from 'next/image'
import { useContext, useState } from 'react'
import { GlobalContext } from '../store/GlobalStore'
import { AiOutlinePlus } from 'react-icons/ai'

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
            novo equipamento
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
      {isOpen && (
        <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black/50">
          <div className="flex w-96 flex-col gap-4 rounded-lg bg-neutral-100 p-4">
            <h1 className="text-center text-2xl font-bold">Novo equipamento</h1>
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col">
                <label
                  className="text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="numberSeries"
                >
                  Numero de serie
                </label>
                <input
                  className="w-full rounded border border-gray-200 bg-gray-50 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="numberSeries"
                  type="text"
                  placeholder="90210"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <label
                  className="text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="type"
                >
                  tipo
                </label>
                <select
                  className="w-full rounded border border-gray-200 bg-gray-50 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="type"
                >
                  <option>Selecione</option>
                  <option>Impressora</option>
                  <option>Monitor</option>
                  <option>Notebook</option>
                </select>
              </div>
            </div>
            <div className="w-full">
              <label
                className="text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="model"
              >
                modelo
              </label>
              <input
                className="w-full rounded border border-gray-200 bg-gray-50 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="model"
                type="text"
                placeholder="Samsung S10"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col">
                <label
                  className="text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="brand"
                >
                  Marca
                </label>
                <select
                  className="w-full rounded border border-gray-200 bg-gray-50 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="brand"
                >
                  <option>Selecione</option>
                  <option>Dell</option>
                  <option>Lenovo</option>
                  <option>LG</option>
                  <option>Mac OS</option>
                  <option>Samsung</option>
                </select>
              </div>
              <div className="flex flex-1 flex-col">
                <label
                  className="text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="status"
                >
                  status
                </label>
                <select
                  className="w-full rounded border border-gray-200 bg-gray-50 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="status"
                >
                  <option>Selecione</option>
                  <option>Novo</option>
                  <option>Usado</option>
                  <option>Ruim</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                OBS:
              </label>
              <textarea
                id="message"
                rows={4}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-fuchsia-500 focus:ring-fuchsia-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-fuchsia-500 dark:focus:ring-fuchsia-600"
                placeholder="Monitor lg com problemas de visão"
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleClick}
                type="button"
                className="rounded-lg border border-fuchsia-400 px-5 py-1.5 text-center text-sm font-medium uppercase text-fuchsia-400 hover:border-fuchsia-800 hover:bg-fuchsia-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-fuchsia-400 dark:border-fuchsia-400 dark:text-blue-500 dark:hover:bg-fuchsia-600 dark:hover:text-white dark:focus:ring-fuchsia-800"
              >
                cancelar
              </button>

              <button className="rounded-lg bg-fuchsia-400 px-5 py-1.5 text-center text-sm font-medium uppercase text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-400 dark:bg-fuchsia-400 dark:hover:bg-fuchsia-400 dark:focus:ring-fuchsia-400">
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
