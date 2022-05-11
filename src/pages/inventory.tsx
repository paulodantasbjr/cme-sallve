import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { getData } from '../services'
import { GlobalContext } from '../store/GlobalStore'
import { EquipamentProps } from '../types/Equipament'

interface InventoryProps {
  equipaments: EquipamentProps[]
  total: number
}

const Inventory: NextPage<InventoryProps> = ({
  equipaments,
}: InventoryProps) => {
  const router = useRouter()
  const { state } = useContext(GlobalContext)

  useEffect(() => {
    if (!state.auth.token) router.push('/login')
  }, [router, state.auth])

  return (
    <>
      <Head>
        <title>Inventorio</title>
      </Head>
      <Layout>
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
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
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
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
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
