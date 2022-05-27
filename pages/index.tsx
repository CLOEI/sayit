import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

import { useAuth } from '../hooks/useAuth'
import supabase from '../supabase'

const Home: NextPage = () => {
  const auth = useAuth()
  const [posts, setPosts] = useState<Posts[] | null>([])

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase
        .rpc('get_posts')
        .order('id', { ascending: false })
      if (error) throw error
      setPosts(data)
    })()
  }, [])

  console.log(posts)

  return (
    <div className="mx-auto max-w-5xl">
      <Head>
        <title>Sayit - Say what in your mind</title>
      </Head>
      <div className="mt-5 space-y-2">
        {posts &&
          posts.length > 0 &&
          posts.map((post) => {
            return <PostCard key={post.id} {...post} />
          })}
      </div>
    </div>
  )
}

export default Home
