import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
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
      <div className="flex h-screen w-screen items-center justify-center bg-lime-200">
        <Image src="/logo.gif" width={100} height={100} alt="logo" />
        <div className="h-40 w-40 bg-fuchsia-400">
          <h1 className="text-2xl">comprar</h1>
        </div>
      </div>
    </>
  )
}

export default Home
