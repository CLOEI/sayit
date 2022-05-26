import React from 'react'
import insertFormat from './utils/insertFormat'

function Body({ body }: { body?: string }) {
  const bodyChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  const bodyKeyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey) {
      switch (e.key) {
        case 'b':
          insertFormat('**')
          break
        case 'i':
          insertFormat('*')
          break
        case 'k':
          e.preventDefault()
          insertFormat('[](', 'url', ')')
          break
        case 'u':
          e.preventDefault()
          insertFormat('<u>', ' ', '</u>')
          break
        case 's':
          e.preventDefault()
          insertFormat('~~')
        default:
          break
      }
    }
  }

  return (
    <textarea
      className="w-full resize-none bg-transparent outline-none"
      placeholder="Write content body here..."
      defaultValue={body}
      onChange={bodyChangeHandler}
      onKeyDown={bodyKeyHandler}
      name="body"
      required
    ></textarea>
  )
}

export default Body
