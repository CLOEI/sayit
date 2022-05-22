const insertFormat = (
  text: string,
  dfText: string = ' ',
  text2: string = ''
) => {
  const body = document.querySelector(
    'textarea[name="body"]'
  ) as HTMLTextAreaElement
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

export default insertFormat
