import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { GlobalContext } from '../store/GlobalStore'

const Inventory: NextPage = () => {
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
        <div className="flex h-full flex-col items-center justify-center">
          <h1>Inventario</h1>
          <p>Em construção</p>
        </div>
      </Layout>
    </>
  )
}

export default Inventory
