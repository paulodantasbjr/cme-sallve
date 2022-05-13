import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { getData } from '../services'
import { GlobalContext } from '../store/GlobalStore'
import { EquipamentProps } from '../types/Equipament'
import { MdEdit, MdDeleteForever } from 'react-icons/md'
import { ModalDelete } from '../components/ModalDelete'
import { Modal } from '../components/Modal'

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

  const handleClose = () => {
    dispatch({ type: 'EDIT_EQUIPAMENT', payload: {} })
    setIsOpen(false)
    setIsOpenEdit(false)
  }

  const handleEdit = (equipament: EquipamentProps) => {
    dispatch({
      type: 'EDIT_EQUIPAMENT',
      payload: equipament,
    })
    setIsOpenEdit(!isOpen)
  }

  const handleDelete = (id: string) => {
    dispatch({
      type: 'DELETE_EQUIPAMENT',
      payload: id,
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
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Número de série
                  </th>
                  <th scope="col" className="px-6 py-3">
                    tipo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    modelo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    marca
                  </th>
                  <th scope="col" className="px-6 py-3">
                    status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    obs
                  </th>
                  {state.auth.user?.role === 'adm' && (
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {equipaments.map((equipament) => (
                  <tr
                    key={equipament.ns}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {equipament.ns}
                    </th>
                    <td className="px-6 py-4">{equipament.type}</td>
                    <td className="px-6 py-4">{equipament.model}</td>
                    <td className="px-6 py-4">{equipament.brand}</td>
                    <td className="px-6 py-4">{equipament.status}</td>
                    <td className="px-6 py-4">
                      {equipament.obs ? equipament.obs : <span>---</span>}
                    </td>
                    {state.auth.user?.role === 'adm' && (
                      <td className="flex items-center justify-center gap-1 px-6 py-4 ">
                        <MdEdit
                          onClick={() => handleEdit(equipament)}
                          className="h-5 w-5 cursor-pointer  text-neutral-500 hover:text-neutral-800"
                        />
                        <div className="h-5 w-0.5 bg-gray-200" />
                        <MdDeleteForever
                          onClick={() => handleDelete(equipament._id)}
                          className="h-5 w-5 cursor-pointer text-rose-500 hover:text-rose-800"
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-grow items-center justify-center">
            <h1 className="text-4xl">Não há equipamentos cadastrados</h1>
          </div>
        )}
      </Layout>
      {isOpen && <ModalDelete handleClose={handleClose} />}
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
