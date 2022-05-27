import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'
import NextProgress from 'next-progress'

import { AuthProvider } from '../hooks/useAuth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NextProgress options={{ showSpinner: false }} />
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
