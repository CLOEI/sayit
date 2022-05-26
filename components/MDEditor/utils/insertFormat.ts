const insertFormat = (
  text: string,
  dfText: string = ' ',
  text2: string = ''
) => {
  const target = document.querySelector(
    'textarea[name="body"]'
  ) as HTMLTextAreaElement
  const selectionStart = target.selectionStart
  const selectionEnd = target.selectionEnd

  let start = target.value.substring(0, selectionStart)
  let middle = target.value.substring(selectionStart, selectionEnd)
  let end = target.value.substring(selectionEnd)
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
  target.value = start + text + middle + text2 + end
  switch (mode) {
    case 0:
      target.selectionStart = selectionStart + textLen
      target.selectionEnd = selectionEnd + textLen
      break
    case 1:
      target.selectionStart = selectionStart + textLen
      target.selectionEnd = target.selectionStart + middle.length
      break
    case 2:
      target.selectionStart = selectionStart - textLen
      target.selectionEnd = selectionEnd - text2Len
      break
    case 3:
      target.selectionStart = selectionStart
      target.selectionEnd = selectionEnd - text2Len
    default:
      break
  }
  target.focus()
}

export default insertFormat
