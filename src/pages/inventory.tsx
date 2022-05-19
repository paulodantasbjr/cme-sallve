import { useContext, useState } from 'react'

import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { AiOutlinePlus } from 'react-icons/ai'
import { InventoryProps } from '../types/Inventory'
import { getData } from '../services'
import { GlobalContext } from '../store/GlobalStore'
import { Layout } from '../components/Layout'
import { ModalDelete } from '../components/ModalDelete'
import { ModalInventory } from '../components/ModalInventory'
import { TableBodyInventory, TableHead } from '../components/Table'

interface IInventory {
  inventory: InventoryProps[]
  total: number
}

const Inventory: NextPage<IInventory> = ({ inventory, total }: IInventory) => {
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
    dispatch({ type: 'INVENTORY', payload: {} })
    setIsOpen(false)
    setIsOpenEdit(false)
  }

  const handleEdit = (inventory: InventoryProps) => {
    dispatch({
      type: 'INVENTORY',
      payload: inventory,
    })
    setIsOpenEdit(!isOpen)
  }

  const handleDelete = (inventory: InventoryProps) => {
    dispatch({
      type: 'INVENTORY',
      payload: inventory,
    })
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Head>
        <title>CME - Inventário</title>
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
                type="reset"
                onClick={() => setIsOpenEdit(true)}
                className="ml-4 flex items-center justify-center gap-1 rounded-lg bg-fuchsia-400 p-2 text-sm font-normal uppercase text-white transition duration-75 hover:bg-fuchsia-600 dark:text-white dark:hover:bg-gray-700 "
              >
                <AiOutlinePlus className="text-white" />
                Novo item
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
                <TableBodyInventory
                  role={state.auth.user?.role}
                  inventory={inventory}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-grow items-center justify-center">
            <h1 className="text-4xl">Não há items cadastrados</h1>
          </div>
        )}
      </Layout>
      {isOpen && (
        <ModalDelete
          callback="/inventory"
          url={`inventory/${state.inventory._id}`}
          title="Você tem certeza que deseja excluir esse item?"
          handleClose={handleClose}
        />
      )}
      {isOpenEdit && <ModalInventory handleClose={handleClose} />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getData('/inventory')
  return {
    props: {
      inventory: res.inventory,
      total: res.total,
    },
  }
}

export default Inventory
