import React, { useRef } from 'react'
import insertFormat from './utils/insertFormat'

function Body() {
  const bodyChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = e.target.scrollHeight + 'px'
  }
  const bodyKeyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey) {
      switch (e.key) {
        case 'b':
          insertFormat('**')
          break
        case 'i':
          insertFormat('__')
          break
        case 'k':
          e.preventDefault()
          insertFormat('[](', 'url', ')')
          break
        default:
          break
      }
    }
  }

  return (
    <textarea
      className="w-full resize-none bg-transparent outline-none"
      placeholder="Write content body here..."
      onChange={bodyChangeHandler}
      onKeyDown={bodyKeyHandler}
      name="body"
      required
    ></textarea>
  )
}

export default Body
