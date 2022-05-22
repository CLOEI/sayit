import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'

import { useAuth } from '../hooks/useAuth'

const Home: NextPage = () => {
  const auth = useAuth()

  return (
    <div className="mx-auto max-w-5xl">
      <Head>
        <title>Sayit - Say what in your mind</title>
      </Head>
      <button onClick={() => auth.signOut()}>ello</button>
    </div>
  )
}

export default Home
