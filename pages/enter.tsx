import React from 'react'
import { FiGithub } from 'react-icons/fi'

import Head from 'next/head'

import { useAuth } from '../hooks/useAuth'

function Enter() {
  const auth = useAuth()

  return (
    <div className="space-y-4 bg-white py-10">
      <Head>
        <title>Welcome! - Sayit</title>
      </Head>
      <div>
        <h2 className="text-center text-2xl font-bold">Welcome to Sayit</h2>
        <p className="text-center">Sign up so you can post!</p>
      </div>
      <div className="px-4">
        <button
          onClick={() => auth.signInWithGithub()}
          className="flex w-full items-center justify-center space-x-4 rounded-md bg-gray-900 py-3 text-white"
        >
          <FiGithub />
          <span>Sign up with GitHub</span>
        </button>
      </div>
    </div>
  )
}

export default Enter
