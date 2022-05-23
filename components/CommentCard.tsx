import React, { useEffect, useState } from 'react'
import TimeAgo from 'react-timeago'

import supabase from '../supabase'

function CommentCard(props: Comments) {
  const [data, setData] = useState<Profile | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data: dbData, error } = await supabase
        .from<Profile>('profiles')
        .select('name, avatar_url')
        .eq('id', props.user_id)
        .single()

      if (error) throw error
      setData(dbData)
    })()
  }, [])

  return (
    <div className="flex space-x-2">
      <div className="mt-3 h-6 w-6 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
        {data && (
          <img
            src={
              data.avatar_url ||
              `https://avatars.dicebear.com/api/adventurer/${data.name}.svg`
            }
          />
        )}
      </div>
      <div className="w-full rounded-md border-2 border-gray-200">
        <div className="px-3 pt-2">
          <p className="text-sm text-gray-500">
            {data?.name || ''} • <TimeAgo date={props.created_at} />
          </p>
        </div>
        <div className="px-3 pt-2 pb-4">
          <p className="leading-7">{props.content}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentCard
