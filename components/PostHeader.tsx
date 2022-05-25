import React, { useState, useEffect } from 'react'
import { AiOutlineMore } from 'react-icons/ai'
import TimeAgo from 'react-timeago'

import supabase from '../supabase'
import { useAuth } from '../hooks/useAuth'

function PostHeader({ avatar_url, name, id, created_at }: Posts) {
  const auth = useAuth()

  const handleDelete = async () => {
    if (auth.user) {
      const { error } = await supabase.from('posts').delete().eq('id', id)
      if (error) throw error
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
          <img
            src={
              avatar_url ||
              `https://avatars.dicebear.com/api/adventurer/${name}.svg`
            }
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm">{name}</p>
          <p className="text-xs">
            <TimeAgo date={created_at} />
          </p>
        </div>
      </div>
      <div>
        <button onClick={handleDelete}>
          <AiOutlineMore className="text-gray-500" size={24} />
        </button>
      </div>
    </div>
  )
}

export default PostHeader
