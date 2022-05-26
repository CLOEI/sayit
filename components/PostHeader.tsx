import React, { useState, useEffect } from 'react'
import { AiOutlineMore } from 'react-icons/ai'
import TimeAgo from 'react-timeago'
import { BsTrashFill, BsPencilFill } from 'react-icons/bs'

import supabase from '../supabase'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

function PostHeader({ avatar_url, name, id, created_at, user_id }: Posts) {
  const [menu, setMenu] = useState(false)
  const router = useRouter()
  const auth = useAuth()

  const deletePost = async () => {
    if (auth.user) {
      const { error } = await supabase.from('posts').delete().eq('id', id)
      if (error) toast.error('Error deleting post')
      router.push('/')
    }
  }

  const editPost = () => router.push(`/edit/${id}`)
  const toggleMenu = () => setMenu(!menu)

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
      <div className="relative">
        {auth?.user?.id === user_id && (
          <button onClick={toggleMenu}>
            <AiOutlineMore className="text-gray-500" size={24} />
          </button>
        )}
        {menu && (
          <div className="absolute bottom-0 right-0 w-48 translate-y-full rounded-md border-2 border-blue-500 bg-white p-2 text-gray-700 shadow-sm">
            <button
              onClick={deletePost}
              className="flex w-full items-center space-x-2 rounded-md py-3 px-1 hover:bg-gray-100"
            >
              <BsTrashFill />
              <span>Delete post</span>
            </button>
            <button
              onClick={editPost}
              className="flex w-full items-center space-x-2 py-3 px-1 hover:bg-gray-100"
            >
              <BsPencilFill />
              <span>Edit post</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostHeader
