import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '../components/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CME - Home</title>
      </Head>
      <Layout>
        <div className="flex h-full flex-col items-center justify-center">
          <h1>Dashboard</h1>
          <p>Em construção</p>
        </div>
      </Layout>
    </>
  )
}

export default Home
