import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { GlobalContext } from '../store/GlobalStore'

const Home: NextPage = () => {
  const router = useRouter()
  const { state } = useContext(GlobalContext)

  useEffect(() => {
    if (!state.auth.token) router.push('/login')
  }, [router, state.auth])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <div className="flex h-full flex-col items-center justify-center">
          <h1>Dashboard</h1>
          <p>Em construção</p>
        </div>

        {/* <div className="flex h-screen  ">
          <Image src="/logo.gif" width={100} height={100} alt="logo" />
          <div className="h-40 w-40 bg-fuchsia-400">
            <h1 className="text-2xl">comprar</h1>
          </div>
        </div> */}
      </Layout>
    </>
  )
}

export default Home
