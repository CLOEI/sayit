import React, { useState } from 'react'
import supabase from '../../supabase'
import { useAuth } from '../../hooks/useAuth'

import Title from './Title'
import Toolbox from './Toolbox'
import Body from './Body'

function Index() {
  const auth = useAuth()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = (e.target as any).title.value
    const body = (e.target as any).body.value

    type Posts = {
      title: string
      body: string
      user_id: string
    }

    await supabase.from<Posts>('posts').insert({
      title,
      body,
      user_id: auth.user?.id,
    })
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="bg-white">
        <div className="p-4">
          <Title />
        </div>
        <Toolbox />
        <div className="p-4">
          <Body />
        </div>
      </div>
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
