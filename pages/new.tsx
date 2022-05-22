import Head from 'next/head'
import MDEditor from '../components/MDEditor'

import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'

function New() {
  const router = useRouter()
  const auth = useAuth()

  if (!auth.user) {
    router.replace('/enter')
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
      <MDEditor />
    </div>
  )
}

export default New
