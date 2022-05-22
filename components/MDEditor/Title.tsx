import React from 'react'

function Title() {
  const titleKeyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const titleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  return (
    <textarea
      className="w-full resize-none bg-transparent text-4xl font-bold outline-none"
      autoComplete="off"
      placeholder="New post title here..."
      onChange={titleChangeHandler}
      onKeyDown={titleKeyHandler}
      name="title"
      required
    ></textarea>
  )
}

export default Title
