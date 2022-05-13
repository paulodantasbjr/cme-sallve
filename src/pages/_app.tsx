import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import { DataProvider } from '../store/GlobalStore'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <DataProvider>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        theme="light"
        pauseOnHover={false}
        autoClose={1000}
        closeButton={true}
      />
    </DataProvider>
  )
}

export default MyApp
