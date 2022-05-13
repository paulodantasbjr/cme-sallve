import { useRouter } from 'next/router'

import { MdClose, MdErrorOutline } from 'react-icons/md'

import { DeleteToastHelper } from '../utils/ToastHelper'

interface ModalDeleteProps {
  handleClose: () => void
  title: string
  url: string
  callback: string
}

export const ModalDelete = ({
  handleClose,
  title,
  url,
  callback,
}: ModalDeleteProps) => {
  const router = useRouter()

  const handleDelete = async () => {
    await DeleteToastHelper(url)

    handleClose()
    router.push(callback)
  }

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 md:inset-0">
      <div className="relative max-w-md rounded-lg bg-white p-4 shadow dark:bg-gray-700 md:h-auto">
        <button
          type="button"
          className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="popup-modal"
        >
          <MdClose className="h-5 w-5" onClick={handleClose} />
        </button>
        <div className="p-6 text-center">
          <MdErrorOutline className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <div className="flex justify-evenly">
            <button
              type="button"
              onClick={handleDelete}
              className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
            >
              Sim
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
