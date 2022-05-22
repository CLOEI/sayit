import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'

import { AuthProvider } from '../hooks/useAuth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
