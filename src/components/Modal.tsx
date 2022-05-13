import { useContext, useState } from 'react'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { EquipamentProps } from '../types/Equipament'
import { GlobalContext } from '../store/GlobalStore'
import { validEquipament } from '../utils/Valid'
import { postData, putData } from '../services'

interface ModalProps {
  handleClose: () => void
}

export const Modal = ({ handleClose }: ModalProps) => {
  const { state } = useContext(GlobalContext)

  const inititalState = {
    ns: state.equipaments.ns ? state.equipaments.ns : '',
    type: state.equipaments.type ? state.equipaments.type : '',
    brand: state.equipaments.brand ? state.equipaments.brand : '',
    model: state.equipaments.model ? state.equipaments.model : '',
    obs: state.equipaments.obs ? state.equipaments.obs : '',
    status: state.equipaments.status ? state.equipaments.status : '',
  } as EquipamentProps
  const [equipamentData, setEquipamentData] = useState(inititalState)

  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setEquipamentData({ ...equipamentData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(equipamentData)

    const erroMsg = validEquipament(
      equipamentData.ns,
      equipamentData.type,
      equipamentData.brand,
      equipamentData.model,
      equipamentData.status
    )
    if (erroMsg) return toast.error(erroMsg)

    const id = toast.loading('Carregando...')
    if (!state.equipaments.ns) {
      const result = await postData('equipament', equipamentData)
      if (result.success) {
        toast.update(id, {
          render: result.success,
          type: 'success',
          isLoading: false,
          autoClose: 1000,
          closeButton: true,
        })
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
    } else {
      const result = await putData(
        `equipament/${state.equipaments._id}`,
        equipamentData
      )
      if (result.success) {
        toast.update(id, {
          render: result.success,
          type: 'success',
          isLoading: false,
          autoClose: 1000,
          closeButton: true,
        })
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

    router.push('/inventory')
    handleClose()
  }

  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black/50">
      <form
        className="flex w-96 flex-col gap-4 rounded-lg bg-neutral-100 p-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-bold">Novo equipamento</h1>
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col">
            <label
              className="text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="numberSeries"
            >
              Número de série
            </label>
            <input
              className="w-full rounded border border-gray-200 bg-gray-50 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="numberSeries"
              type="text"
              required
              name="ns"
              value={equipamentData.ns}
              onChange={handleChange}
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
              required
              name="type"
              value={equipamentData.type}
              onChange={handleChange}
              className="w-full rounded border border-gray-200 bg-gray-50 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="type"
            >
              <option className="uppercase">Selecione</option>
              <option className="uppercase" value="impressora">
                Impressora
              </option>
              <option className="uppercase" value="monitor">
                Monitor
              </option>
              <option className="uppercase" value="notebook">
                Notebook
              </option>
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
            required
            type="text"
            name="model"
            value={equipamentData.model}
            onChange={handleChange}
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
              name="brand"
              required
              value={equipamentData.brand}
              onChange={handleChange}
            >
              <option className="uppercase">Selecione</option>
              <option className="uppercase" value="dell">
                Dell
              </option>
              <option className="uppercase" value="lenovo">
                Lenovo
              </option>
              <option className="uppercase" value="lg">
                LG
              </option>
              <option className="uppercase" value="macOS">
                Mac OS
              </option>
              <option className="uppercase" value="samsung">
                Samsung
              </option>
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
              name="status"
              required
              value={equipamentData.status}
              onChange={handleChange}
            >
              <option className="uppercase">Selecione</option>
              <option className="uppercase" value="novo">
                Novo
              </option>
              <option className="uppercase" value="usado">
                Usado
              </option>
              <option className="uppercase" value="ruim">
                Ruim
              </option>
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
            name="obs"
            value={equipamentData.obs}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-fuchsia-500 focus:ring-fuchsia-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-fuchsia-500 dark:focus:ring-fuchsia-600"
            placeholder="Monitor lg com problemas de visão"
          ></textarea>
        </div>
        <div className=" flex items-center justify-between">
          <button
            onClick={handleClose}
            type="button"
            className="rounded-lg border border-fuchsia-400 px-5 py-1.5 text-center text-sm font-medium uppercase text-fuchsia-400 hover:border-fuchsia-800 hover:bg-fuchsia-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-fuchsia-400 dark:border-fuchsia-400 dark:text-blue-500 dark:hover:bg-fuchsia-600 dark:hover:text-white dark:focus:ring-fuchsia-800"
          >
            cancelar
          </button>
          {state.equipaments.ns ? (
            <button
              type="submit"
              className="rounded-lg bg-fuchsia-400 px-5 py-1.5 text-center text-sm font-medium uppercase text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-400 dark:bg-fuchsia-400 dark:hover:bg-fuchsia-400 dark:focus:ring-fuchsia-400"
            >
              Editar
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-lg bg-fuchsia-400 px-5 py-1.5 text-center text-sm font-medium uppercase text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-400 dark:bg-fuchsia-400 dark:hover:bg-fuchsia-400 dark:focus:ring-fuchsia-400"
            >
              Criar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
