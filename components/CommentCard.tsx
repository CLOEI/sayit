import React, { useEffect, useState } from 'react'
import TimeAgo from 'react-timeago'
import { toast } from 'react-hot-toast'

import supabase from '../supabase'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'

type FormData = {
  reply: string
}
interface Props extends Comments {
  refresh: () => Promise<void>
  isReplies: boolean
}

function CommentCard(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm<FormData>()
  const auth = useAuth()
  const [reply, setReply] = useState(false)

  useEffect(() => {
    reset({
      reply: '',
    })
    if (isSubmitSuccessful) {
      toggleReply()
      toast.promise(props.refresh(), {
        loading: 'Sending reply...',
        success: 'Reply sent!',
        error: 'Error sending reply',
      })
    }
  }, [isSubmitSuccessful])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (auth.user) {
      toggleReply()
    } else {
      toast.error('You must be logged in to reply')
    }
  }
  const toggleReply = () => setReply(!reply)
  const onSubmit = handleSubmit(async (formData) => {
    if (auth.user) {
      const { error } = await supabase.from<Comments>('comments').insert({
        content: formData.reply,
        post_id: props.post_id,
        user_id: auth.user.id,
        reply_to: props.author_name,
        parent_id: props.isReplies ? props.parent_id : props.id,
      })
      if (error) throw error
    }
  })

  return (
    <div className="flex space-x-2">
      <div className="mt-3 h-6 w-6 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
        <img
          src={
            props.author_profile ||
            `https://avatars.dicebear.com/api/adventurer/${props.author_name}.svg`
          }
        />
      </div>
      <div className="w-full">
        <div className="w-full rounded-md border-2 border-gray-200">
          <div className="px-3 pt-2">
            <p className="text-sm text-gray-500">
              {props.isReplies ? (
                <>
                  {props.author_name} ﹥ {props.reply_to} •{' '}
                  <TimeAgo date={props.created_at} />
                </>
              ) : (
                <>
                  {props.author_name} • <TimeAgo date={props.created_at} />
                </>
              )}
            </p>
          </div>
          <div className="px-3 pt-2 pb-4">
            <p className="leading-7">{props.content}</p>
          </div>
        </div>
        <div>
          {!reply && (
            <button onClick={handleClick} className="px-2 py-1 text-gray-500">
              Reply
            </button>
          )}
          {reply && (
            <form onSubmit={onSubmit} className="mt-3">
              <textarea
                className="w-full resize-none rounded-md border-2 border-gray-200 p-2"
                placeholder="Reply..."
                {...register('reply', { required: true })}
              ></textarea>
              <div>
                <button
                  type="submit"
                  className="rounded-md bg-blue-400 px-2 py-2 text-white"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleReply}
                  className="px-2 py-2"
                >
                  Dismiss
                </button>
              </div>
            </form>
          )}
        </div>
        {!props.isReplies && (
          <div className="mt-2 space-y-2">
            {props.replies &&
              props.replies.map((reply) => {
                return (
                  <CommentCard
                    key={reply.id}
                    refresh={props.refresh}
                    isReplies={true}
                    {...reply}
                  />
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentCard
