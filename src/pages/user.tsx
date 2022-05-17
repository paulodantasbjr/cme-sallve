import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useContext, useState } from 'react'

import { Layout } from '../components/Layout'
import { ModalDelete } from '../components/ModalDelete'
import { ModalUser } from '../components/ModalUser'
import { TableBodyUser, TableHead } from '../components/Table'
import { getData } from '../services'
import { GlobalContext } from '../store/GlobalStore'

import { UserProps } from '../types/User'

interface UserTypes {
  users: UserProps[]
  total: number
}

const User: NextPage<UserTypes> = ({ total, users }: UserTypes) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const { state, dispatch } = useContext(GlobalContext)

  const th = [
    { id: 1, name: 'ID' },
    { id: 2, name: 'email' },
    { id: 3, name: 'nome' },
    { id: 4, name: 'cargo' },
    { id: 5, name: '' },
  ]

  const handleClose = () => {
    dispatch({ type: 'USER', payload: {} })
    setIsOpen(false)
    setIsOpenEdit(false)
  }

  const handleEdit = (user: UserProps) => {
    dispatch({
      type: 'USER',
      payload: user,
    })
    setIsOpenEdit(!isOpen)
  }

  const handleDelete = (user: UserProps) => {
    dispatch({
      type: 'USER',
      payload: user,
    })
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Head>
        <title>CME - Usuários</title>
      </Head>
      <Layout>
        {total > 0 ? (
          <div className="relative flex-grow overflow-x-auto p-4 shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <TableHead th={th} role={state.auth.user?.role} />
              </thead>
              <tbody>
                <TableBodyUser
                  role={state.auth.user?.role}
                  users={users}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-grow items-center justify-center">
            <h1 className="text-4xl">Não há usuários cadastrados</h1>
          </div>
        )}
      </Layout>
      {isOpen && (
        <ModalDelete
          callback="/user"
          url={`user/${state.users._id}`}
          title="Você tem certeza que deseja excluir esse usuário?"
          handleClose={handleClose}
        />
      )}
      {isOpenEdit && <ModalUser handleClose={handleClose} />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getData('/user')
  return {
    props: {
      users: res.users,
      total: res.total,
    },
  }
}

export default User
