import React from 'react'
import supabase from '../../supabase'
import { useAuth } from '../../hooks/useAuth'

import Title from './Title'
import Toolbox from './Toolbox'
import Body from './Body'

import { useRouter } from 'next/router'

function Index() {
  const router = useRouter()
  const auth = useAuth()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = (e.target as any).title.value
    const body = (e.target as any).body.value

    if (auth.user) {
      await supabase.from<Post>('posts').insert({
        title,
        body,
        user_id: auth.user.id,
      })
    } else {
      router.push('/enter')
    }
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <form className="w-full space-y-4" onSubmit={onSubmit}>
      <div className="bg-white">
        <div className="p-4">
          <Title />
        </div>
        <Toolbox />
        <div className="p-4">
          <Body />
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
