import React from 'react'
import insertFormat from './utils/insertFormat'

function Body() {
  const bodyChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  const bodyKeyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = document.querySelector(
      'textarea[name="body"]'
    ) as HTMLTextAreaElement

    if (e.ctrlKey) {
      switch (e.key) {
        case 'b':
          insertFormat(target, '**')
          break
        case 'i':
          insertFormat(target, '*')
          break
        case 'k':
          e.preventDefault()
          insertFormat(target, '[](', 'url', ')')
          break
        case 'u':
          e.preventDefault()
          insertFormat(target, '<u>', ' ', '</u>')
          break
        case 's':
          e.preventDefault()
          insertFormat(target, '~~')
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
