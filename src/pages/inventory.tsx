import { useContext, useState } from 'react'

import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import { EquipamentProps } from '../types/Equipament'
import { getData } from '../services'
import { GlobalContext } from '../store/GlobalStore'
import { Layout } from '../components/Layout'
import { Modal } from '../components/Modal'
import { ModalDelete } from '../components/ModalDelete'
import { TableBodyEquipaments, TableHead } from '../components/Table'

interface InventoryProps {
  equipaments: EquipamentProps[]
  total: number
}

const Inventory: NextPage<InventoryProps> = ({
  equipaments,
  total,
}: InventoryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const { state, dispatch } = useContext(GlobalContext)

  const th = [
    { id: 1, name: 'Número de série' },
    { id: 2, name: 'tipo' },
    { id: 3, name: 'modelo' },
    { id: 4, name: 'marca' },
    { id: 5, name: 'status' },
    { id: 6, name: 'obs' },
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
        <title>CME - Inventário</title>
      </Head>
      <Layout>
        {total > 0 ? (
          <div className="relative flex-grow overflow-x-auto p-4 shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <TableHead th={th} role={state.auth.user?.role} />
              </thead>
              <tbody>
                <TableBodyEquipaments
                  role={state.auth.user?.role}
                  equipaments={equipaments}
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
          callback="/inventory"
          url={`equipament/${state.equipaments._id}`}
          title="Você tem certeza que deseja excluir esse equipamento?"
          handleClose={handleClose}
        />
      )}
      {isOpenEdit && <Modal handleClose={handleClose} />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getData('/equipament')
  return {
    props: {
      equipaments: res.equipaments,
      total: res.total,
    },
  }
}

export default Inventory
