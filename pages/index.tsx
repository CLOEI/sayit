import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'

import { useAuth } from '../hooks/useAuth'
import supabase from '../supabase'

const Home: NextPage = () => {
  const auth = useAuth()
  const [posts, setPosts] = useState<Posts[]>([])

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase
        .from<Posts>('posts')
        .select('*')
        .order('id', { ascending: false })
      if (error) {
        throw error
      }
      setPosts(data)
    })()
  }, [])

  return (
    <div className="mx-auto max-w-5xl">
      <Head>
        <title>Sayit - Say what in your mind</title>
      </Head>
      <div className="mt-5 space-y-2">
        {posts.length > 0 &&
          posts.map((post) => {
            return <PostCard key={post.id} {...post} />
          })}
      </div>
    </div>
  )
}

export default Home
