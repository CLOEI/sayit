import React from 'react'
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai'

import Link from 'next/link'
import { useRouter } from 'next/router'
import PostHeader from './PostHeader'

function PostCard(props: Posts) {
  const router = useRouter()

  const comments = () => router.push(`/posts/${props.id}#comments`)

  return (
    <div className="w-full space-y-4 bg-white px-4 pt-4 pb-3 shadow-sm">
      <PostHeader user_id={props.user_id} created_at={props.created_at} />
      <div>
        <h2>
          <Link href={`/posts/${props.id}`}>
            <a className="text-xl font-bold">{props.title}</a>
          </Link>
        </h2>
      </div>
      <div className="flex space-x-5">
        <button className="disabled flex items-center space-x-1">
          <AiOutlineHeart className="text-red-500" size={24} />
          <span>0</span>
        </button>
        <button onClick={comments} className="flex items-center space-x-1">
          <AiOutlineComment className="text-gray-500" size={24} />
          <span>0</span>
        </button>
      </div>
    </div>
  )
}

export default PostCard
