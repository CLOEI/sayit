import React from 'react'
import TimeAgo from 'react-timeago'

type Props = {
  author_profile: string
  author_name: string
  created_at: string
}

function PostHeader({ author_profile, author_name, created_at }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
        <img
          src={
            author_profile ||
            `https://avatars.dicebear.com/api/adventurer/${author_name}.svg`
          }
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm">{author_name}</p>
        <p className="text-xs">
          <TimeAgo date={created_at} />
        </p>
      </div>
    </div>
  )
}

export default PostHeader
