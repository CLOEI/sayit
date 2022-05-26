import Head from 'next/head'
import MDEditor from '../components/MDEditor'
import { toast } from 'react-hot-toast'

import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'
import supabase from '../supabase'

function New() {
  const router = useRouter()
  const auth = useAuth()

  if (!auth.user) {
    router.replace('/enter')
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = (e.target as any).title.value
    const body = (e.target as any).body.value

    if (auth.user) {
      const toastId = toast.loading('Adding post...')
      const { error } = await supabase.from<Posts>('posts').insert({
        title,
        body,
        user_id: auth.user.id,
      })
      if (error) {
        return toast.error('Something went wrong', {
          id: toastId,
        })
      } else {
        toast.success('Post added!', {
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
        <title>New Post - Sayit</title>
      </Head>
      <button className="p-2">Editor</button>
      <button className="cursor-not-allowed p-2 opacity-[38%]" disabled>
        Preview
      </button>
      <MDEditor onSubmit={onSubmit} />
    </div>
  )
}

export default New
