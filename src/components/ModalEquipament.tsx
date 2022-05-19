import { useContext, useState } from 'react'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { GlobalContext } from '../store/GlobalStore'
import { PostToastHelper, PutToastHelper } from '../utils/ToastHelper'
import { validEquipament } from '../utils/Valid'
import { EquipamentProps } from '../types/Equipament'

interface ModalEquipamentProps {
  handleClose: () => void
}

export const ModalEquipament = ({ handleClose }: ModalEquipamentProps) => {
  const { state } = useContext(GlobalContext)

  const initialState = {
    ns: state.equipament.ns ? state.equipament.ns : '',
    type: state.equipament.type ? state.equipament.type : '',
    brand: state.equipament.brand ? state.equipament.brand : '',
    model: state.equipament.model ? state.equipament.model : '',
    obs: state.equipament.obs ? state.equipament.obs : '',
    status: state.equipament.status ? state.equipament.status : '',
    local: state.equipament.local ? state.equipament.local : '',
  } as EquipamentProps

  const [equipamentData, setEquipamentData] = useState(initialState)

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

    const erroMsg = validEquipament(
      equipamentData.ns,
      equipamentData.type,
      equipamentData.brand,
      equipamentData.model,
      equipamentData.status,
      equipamentData.local
    )
    if (erroMsg) return toast.error(erroMsg)

    if (!state.equipament._id) {
      await PostToastHelper('equipament', equipamentData)
    } else {
      await PutToastHelper(`equipament/${state.equipament._id}`, equipamentData)
    }
    router.push('/equipament')
    handleClose()
  }

  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black/50">
      <form
        className="flex w-96 flex-col gap-4 rounded-lg bg-neutral-100 p-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-bold uppercase">
          {!state.equipament._id ? 'Novo item' : 'Editar inventario'}
        </h1>
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
        <div className="flex gap-4">
          <div>
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
          <div>
            <label
              className="text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="local"
            >
              LOCAL
            </label>
            <select
              className="w-full rounded border border-gray-200 bg-gray-50 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="local"
              name="local"
              required
              value={equipamentData.local}
              onChange={handleChange}
            >
              <option className="uppercase">Selecione</option>
              <option className="uppercase" value="SALLVE">
                SALLVE
              </option>
              <option className="uppercase" value="DEPOSITO">
                DEPOSITO
              </option>
              <option className="uppercase" value="PESSOAL">
                PESSOAL
              </option>
            </select>
          </div>
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
              <option className="uppercase" value="andamento">
                Em andamento
              </option>
              <option className="uppercase" value="aguardando">
                Aguardando
              </option>
              <option className="uppercase" value="finalizado">
                Finalizado
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
          {state.equipament.ns ? (
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
