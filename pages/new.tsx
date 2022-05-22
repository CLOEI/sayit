import { useState } from 'react'

import Head from 'next/head'
import MDEditor from '../components/MDEditor'

function New() {
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
