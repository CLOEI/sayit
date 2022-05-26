import React from 'react'
import supabase from '../../supabase'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'

import Title from './Title'
import Toolbox from './Toolbox'
import Body from './Body'

import { useRouter } from 'next/router'

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<string | undefined>
  value?: Posts
}

function Index({ onSubmit, value }: Props) {
  const router = useRouter()
  const auth = useAuth()

  return (
    <form className="w-full space-y-4" onSubmit={onSubmit}>
      <div className="bg-white">
        <div className="p-4">
          <Title title={value?.title} />
        </div>
        <Toolbox />
        <div className="p-4">
          <Body body={value?.body} />
        </div>
      </div>
      <p className="text-xs">Note: you can write your own markdown.</p>
      <button
        className="rounded-md bg-blue-700 px-4 py-2 text-white"
        type="submit"
      >
        Publish
      </button>
    </form>
  )
}

export default Index
