import React, { useState } from 'react'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'

import { useRouter } from 'next/router'
import { useAuth } from '../hooks/useAuth'

import Image from 'next/image'

function Navbar() {
  const [menu, setMenu] = useState(false)
  const router = useRouter()
  const auth = useAuth()

  const toggleMenu = () => setMenu(!menu)
  const logout = () => {
    auth.signOut()
    toggleMenu()
  }

  return (
    <nav className="sticky top-0 z-10 flex w-full items-center justify-between bg-white p-2 shadow-sm">
      <div className="flex items-center">
        <button onClick={() => router.push('/')}>
          <h1 className="rounded-sm border-2 border-black p-1 text-2xl font-bold">
            Sayit
          </h1>
        </button>
        <div className="ml-5 hidden items-center rounded-md bg-gray-100 p-2 ring-blue-200 hover:bg-white hover:ring-2 sm:flex">
          <AiOutlineSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent pl-2 outline-none"
            autoComplete="off"
          />
        </div>
      </div>
      {auth.user ? (
        <div className="flex space-x-2">
          <button
            onClick={() => router.push('/new')}
            className="flex items-center space-x-1 rounded-md border-2 border-blue-500 p-2 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            <AiOutlinePlus />
            <span className="hidden sm:inline">Create a post</span>
          </button>
          <div
            onClick={toggleMenu}
            className="relative h-10 w-10 cursor-pointer overflow-hidden rounded-full"
          >
            <Image
              src={auth.user.user_metadata.avatar_url}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => router.push('/enter')}
            className="rounded-md border-2 border-blue-500 p-2 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Create account
          </button>
        </div>
      )}
      {menu && (
        <div className="absolute bottom-0 right-0 w-48 translate-y-full rounded-md border-2 border-blue-500 bg-white p-2 text-gray-700 shadow-sm">
          <button
            onClick={logout}
            className="flex w-full items-center space-x-2 rounded-md py-3 px-1 hover:bg-gray-100"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
