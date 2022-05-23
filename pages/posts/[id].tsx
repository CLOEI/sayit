import type { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useForm } from 'react-hook-form'

import Head from 'next/head'
import supabase from '../../supabase'
import PostHeader from '../../components/PostHeader'
import { useAuth } from '../../hooks/useAuth'
import CommentCard from '../../components/CommentCard'

type Props = {
  data: Post
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
  const auth = useAuth()

  useEffect(() => {
    ;(async () => {
      const { data: dbData, error } = await supabase
        .from<Comments>('comments')
        .select('*')
        .eq('post_id', data.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setComments(dbData)
    })()
  }, [])

  useEffect(() => {
    reset({
      reply: '',
    })
  }, [isSubmitSuccessful])

  const onSubmit = handleSubmit(async (formData) => {
    if (auth.user) {
      const { name, avatar_url } = auth.user.user_metadata

      const { data: dbData, error } = await supabase
        .from<Comments>('comments')
        .insert({
          comment: formData.reply,
          author_name: name,
          author_profile: avatar_url,
          post_id: data.id,
          user_id: auth.user.id,
        })
      if (error) throw error
      setComments((prev) => [dbData[0], ...prev])
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
        <h2 className="mb-6 text-xl font-bold">Discussion</h2>
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
              return <CommentCard key={comment.id} {...comment} />
            })}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query
  const { data, error } = await supabase
    .from('posts')
    .select('*')
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
