import { useContext, useState } from 'react'

import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import { EquipamentProps } from '../types/Equipament'
import { getData } from '../services'
import { GlobalContext } from '../store/GlobalStore'
import { Layout } from '../components/Layout'
import { ModalDelete } from '../components/ModalDelete'
import { ModalEquipament } from '../components/ModalEquipament'
import { TableBodyEquipament, TableHead } from '../components/Table'
import { AiOutlinePlus } from 'react-icons/ai'

interface IEquipament {
  equipament: EquipamentProps[]
  total: number
}

const Equipament: NextPage<IEquipament> = ({
  equipament,
  total,
}: IEquipament) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const { state, dispatch } = useContext(GlobalContext)

  const th = [
    { id: 1, name: 'Número de série' },
    { id: 2, name: 'tipo' },
    { id: 3, name: 'modelo' },
    { id: 4, name: 'marca' },
    { id: 5, name: 'status' },
    { id: 6, name: 'local' },
    { id: 7, name: 'obs' },
  ]

  const handleClose = () => {
    dispatch({ type: 'EQUIPAMENT', payload: {} })
    setIsOpen(false)
    setIsOpenEdit(false)
  }

  const handleEdit = (equipament: EquipamentProps) => {
    dispatch({
      type: 'EQUIPAMENT',
      payload: equipament,
    })
    setIsOpenEdit(!isOpen)
  }

  const handleDelete = (equipament: EquipamentProps) => {
    dispatch({
      type: 'EQUIPAMENT',
      payload: equipament,
    })
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Head>
        <title>CME - Equipamento</title>
      </Head>
      <Layout>
        <div className="mt-2 mr-2 flex justify-between">
          {state.auth.user?.role === 'ADM' && (
            <>
              <button
                type="button"
                className="ml-4 flex items-center justify-center gap-1 rounded-lg bg-lime-300 p-2 text-sm font-normal uppercase text-black transition duration-75 hover:bg-lime-600 dark:text-white dark:hover:bg-gray-700 "
              >
                Extrair CSV
              </button>
              <button
                type="button"
                onClick={() => setIsOpenEdit(true)}
                className="ml-4 flex items-center justify-center gap-1 rounded-lg bg-fuchsia-400 p-2 text-sm font-normal uppercase text-white transition duration-75 hover:bg-fuchsia-600 dark:text-white dark:hover:bg-gray-700 "
              >
                <AiOutlinePlus className="text-white" />
                Novo Equipamento
              </button>
            </>
          )}
        </div>
        {total > 0 ? (
          <div className="relative flex-grow overflow-x-auto p-4 shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <TableHead th={th} role={state.auth.user?.role} />
              </thead>
              <tbody>
                <TableBodyEquipament
                  role={state.auth.user?.role}
                  equipament={equipament}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-grow items-center justify-center">
            <h1 className="text-4xl">Não há equipamentos cadastrados</h1>
          </div>
        )}
      </Layout>
      {isOpen && (
        <ModalDelete
          callback="/equipament"
          url={`equipament/${state.equipament._id}`}
          title="Você tem certeza que deseja excluir esse equipamento?"
          handleClose={handleClose}
        />
      )}
      {isOpenEdit && <ModalEquipament handleClose={handleClose} />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getData('/equipament')
  return {
    props: {
      equipament: res.equipament,
      total: res.total,
    },
  }
}

export default Equipament
