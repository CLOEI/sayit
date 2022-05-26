import type { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import Head from 'next/head'
import supabase from '../../supabase'
import PostHeader from '../../components/PostHeader'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import CommentCard from '../../components/CommentCard'

type Props = {
  data: Posts
}
type FormData = {
  reply: string
}

function Index({ data }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm<FormData>()
  const [comments, setComments] = useState<Comments[]>([])
  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    fetchComments()
  }, [])

  useEffect(() => {
    reset({
      reply: '',
    })
    if (isSubmitSuccessful) {
      toast.promise(fetchComments(), {
        loading: 'Sending reply...',
        success: 'Reply sent!',
        error: 'Error sending reply',
      })
    }
  }, [isSubmitSuccessful])

  const fetchComments = async () => {
    const { data: dbData, error } = await supabase
      .rpc<Comments>('get_comments_with_profile')
      .eq('post_id', data.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    setComments(dbData)
  }

  const checkAuth = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (!auth.user) {
      toast.error('You must be logged in to comment')
      router.push('/enter')
    }
  }

  const onSubmit = handleSubmit(async (formData) => {
    if (auth.user) {
      const toastId = toast.loading('Sending comment...')
      const { error } = await supabase.from<Comments>('comments').insert({
        content: formData.reply,
        post_id: data.id,
        user_id: auth.user.id,
      })

      if (error) {
        return toast.error('Error sending comment', {
          id: toastId,
        })
      } else {
        toast.success('Comment sent', {
          id: toastId,
        })
        fetchComments()
      }
    }
  })

  return (
    <div className="bg-white p-3">
      <Head>
        <title>{data.title}</title>
      </Head>
      <PostHeader {...data} />
      <div className="my-2">
        <h1 className="text-3xl font-bold">{data.title}</h1>
      </div>
      <ReactMarkdown children={data.body} remarkPlugins={[remarkGfm]} />
      <div className="mt-3">
        <h2 className="mb-6 text-xl font-bold">
          Discussion ({data.comment_count || 0})
        </h2>
        <form onSubmit={onSubmit} className="flex space-x-2">
          <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
            <img
              src={
                auth.user?.user_metadata.avatar_url ||
                `https://avatars.dicebear.com/api/adventurer/sayit.svg`
              }
            />
          </div>
          <div className="w-full">
            <textarea
              onClick={checkAuth}
              className="w-full resize-none rounded-md border-2 border-gray-200 p-2"
              placeholder="Send a reply"
              {...register('reply', { required: true })}
            ></textarea>
            {!!watch('reply') && (
              <div className="mt-1">
                <button className="rounded-md bg-blue-500 py-2 px-3 text-white">
                  Submit
                </button>
              </div>
            )}
          </div>
        </form>
        <div className="mt-4 space-y-1">
          {comments.length > 0 &&
            comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.id}
                  refresh={fetchComments}
                  isReplies={false}
                  {...comment}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query
  const { data, error } = await supabase
    .rpc('get_posts')
    .eq('id', query.id)
    .single()

  if (error) throw error

  return {
    props: {
      data,
    },
  }
}

export default Index
