import React from 'react'
import { toast } from 'react-hot-toast'

import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import Head from 'next/head'
import MDEditor from '../../components/MDEditor'
import supabase from '../../supabase'
import { GetServerSideProps } from 'next'

type Props = {
  data: Posts
}

function Index({ data }: Props) {
  console.log(data)
  const auth = useAuth()
  const router = useRouter()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = (e.target as any).title.value
    const body = (e.target as any).body.value

    if (auth.user) {
      const toastId = toast.loading('Editing post...')
      const { error } = await supabase
        .from<Posts>('posts')
        .update({
          title,
          body,
        })
        .match({ id: data.id })
      if (error) {
        return toast.error('Something went wrong', {
          id: toastId,
        })
      } else {
        toast.success('Post edited!', {
          id: toastId,
        })
        router.push('/')
      }
    } else {
      router.push('/enter')
    }
    ;(e.target as HTMLFormElement).reset()
  }
  return (
    <div>
      <Head>
        <title>Edit Post - Sayit</title>
      </Head>
      <button className="p-2">Editor</button>
      <button className="cursor-not-allowed p-2 opacity-[38%]" disabled>
        Preview
      </button>
      <MDEditor onSubmit={onSubmit} value={data} />
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
