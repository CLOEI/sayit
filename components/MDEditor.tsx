import React, { useRef } from 'react'
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
  AiOutlineUnderline,
  AiOutlineStrikethrough,
} from 'react-icons/ai'
import { RiDoubleQuotesL, RiHeading } from 'react-icons/ri'
import { BsCode, BsCodeSquare, BsCardImage } from 'react-icons/bs'
import { v4 as uuid } from 'uuid'

import { useAuth } from '../hooks/useAuth'
import supabase from '../supabase'

/*
  TODO: Complete all markdown button functionality
*/
function MDEditor() {
  const auth = useAuth()
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const titleKeyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const titleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  const bodyHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`${uuid()}`, file)

      if (error) {
        throw error
      }
      if (data) {
        insertFormat(
          '![Image description](',
          `https://gcvuinboilazvaioqsxy.supabase.co/storage/v1/object/public/${data.Key}`,
          ')'
        )
      }
    }
  }

  const insertFormat = (
    text: string,
    dfText: string = ' ',
    text2: string = ''
  ) => {
    const body = bodyRef.current as HTMLTextAreaElement
    const selectionStart = body.selectionStart
    const selectionEnd = body.selectionEnd

    let start = body.value.substring(0, selectionStart)
    let middle = body.value.substring(selectionStart, selectionEnd)
    let end = body.value.substring(selectionEnd)
    let mode = 0

    if (text2 === '') {
      text2 = text
    }

    const textLen = text.length
    const text2Len = text2.length

    if (selectionStart === selectionEnd) {
      middle = dfText
      mode = 1
    } else {
      if (start.slice(-textLen) === text && end.slice(0, text2Len) === text2) {
        start = start.slice(0, -textLen)
        end = end.slice(text2Len)
        text = ''
        text2 = ''
        mode = 2
      }
      if (
        middle.slice(0, textLen) === text &&
        middle.slice(-text2Len) === text2
      ) {
        middle = middle.slice(textLen, -text2Len)
        text = ''
        text2 = ''
        mode = 3
      }
    }
    body.value = start + text + middle + text2 + end
    switch (mode) {
      case 0:
        body.selectionStart = selectionStart + textLen
        body.selectionEnd = selectionEnd + textLen
        break
      case 1:
        body.selectionStart = selectionStart + textLen
        body.selectionEnd = body.selectionStart + middle.length
        break
      case 2:
        body.selectionStart = selectionStart - textLen
        body.selectionEnd = selectionEnd - text2Len
        break
      case 3:
        body.selectionStart = selectionStart
        body.selectionEnd = selectionEnd - text2Len
      default:
        break
    }
    body.focus()
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = (e.target as any).title.value
    const body = (e.target as any).body.value

    type Posts = {
      title: string
      body: string
      user_id: string
    }

    await supabase.from<Posts>('posts').insert({
      title,
      body,
      user_id: auth.user?.id,
    })

    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="bg-white">
        <div className="p-4">
          <textarea
            className="w-full resize-none bg-transparent text-4xl font-bold outline-none"
            autoComplete="off"
            placeholder="New post title here..."
            onChange={titleChangeHandler}
            onKeyDown={titleKeyHandler}
            name="title"
            required
          ></textarea>
        </div>
        <div className="flex w-full overflow-auto bg-gray-300 p-2">
          <input
            id="image-input"
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            multiple={false}
            onChange={imageHandler}
          />
          <button className="md-icon" type="button">
            <AiOutlineBold size={20} />
          </button>
          <button className="md-icon" type="button">
            <AiOutlineItalic size={20} />
          </button>
          <button className="md-icon" type="button">
            <AiOutlineLink size={20} />
          </button>
          <button className="md-icon" type="button">
            <AiOutlineOrderedList size={20} />
          </button>
          <button className="md-icon" type="button">
            <AiOutlineUnorderedList size={20} />
          </button>
          <button className="md-icon" type="button">
            <RiHeading size={20} />
          </button>
          <button className="md-icon" type="button">
            <RiDoubleQuotesL size={20} />
          </button>
          <button className="md-icon" type="button">
            <BsCode size={20} />
          </button>
          <button className="md-icon" type="button">
            <BsCodeSquare size={20} />
          </button>
          <label htmlFor="image-input" className="md-icon">
            <BsCardImage size={20} />
          </label>
          <button className="md-icon" type="button">
            <AiOutlineUnderline size={20} />
          </button>
          <button className="md-icon" type="button">
            <AiOutlineStrikethrough size={20} />
          </button>
        </div>
        <div className="p-4">
          <textarea
            className="w-full resize-none bg-transparent outline-none"
            placeholder="Write content body here..."
            onChange={bodyHandler}
            onKeyDown={bodyKeyHandler}
            ref={bodyRef}
            name="body"
            required
          ></textarea>
        </div>
      </div>
      <button
        className="rounded-md bg-blue-700 px-4 py-2 text-white"
        type="submit"
      >
        Publish
      </button>
    </form>
  )
}

export default MDEditor
