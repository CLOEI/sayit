import React, { useState, useEffect } from 'react'
import TimeAgo from 'react-timeago'

import supabase from '../supabase'

type Props = {
  user_id: string
  created_at: string
}

function PostHeader({ user_id, created_at }: Props) {
  const [data, setData] = useState<Profile | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data: dbData, error } = await supabase
        .from<Profile>('profiles')
        .select('name, avatar_url')
        .eq('id', user_id)
        .single()

      if (error) throw error
      setData(dbData)
    })()
  }, [])

  return (
    <div className="flex items-center space-x-2">
      <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
        {data && (
          <img
            src={
              data.avatar_url ||
              `https://avatars.dicebear.com/api/adventurer/${data.name}.svg`
            }
          />
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-sm">{data ? data.name : ''}</p>
        <p className="text-xs">
          <TimeAgo date={created_at} />
        </p>
      </div>
    </div>
  )
}

export default PostHeader
