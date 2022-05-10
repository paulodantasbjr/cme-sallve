import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
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
