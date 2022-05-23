import React from 'react'
import TimeAgo from 'react-timeago'

function CommentCard(props: Comments) {
  return (
    <div className="flex space-x-2">
      <div className="mt-3 h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
        <img
          src={
            props.author_profile ||
            `https://avatars.dicebear.com/api/adventurer/${props.author_name}.svg`
          }
        />
      </div>
      <div className="w-full rounded-md border-2 border-gray-200">
        <div className="px-3 pt-2">
          <p className="text-sm text-gray-500">
            {props.author_name} • <TimeAgo date={props.created_at} />
          </p>
        </div>
        <div className="px-3 pt-2 pb-4">
          <p className="leading-7">{props.comment}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentCard
