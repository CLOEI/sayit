const format = (
	target: HTMLTextAreaElement | null,
	text1: string,
	defaultText: string = ' ',
	text2: string = ''
) => {
	if (target == null) return;
	const selectionStart = target.selectionStart;
	const selectionEnd = target.selectionEnd;

	let start = target.value.substring(0, selectionStart);
	let middle = target.value.substring(selectionStart, selectionEnd);
	let end = target.value.substring(selectionEnd);
	let mode = 0;

	if (text2 === '') {
		text2 = text1;
	}

	const text1Len = text1.length;
	const text2Len = text2.length;

	if (selectionStart === selectionEnd) {
		middle = defaultText;
		mode = 1;
	} else {
		if (start.slice(-text1Len) === text1 && end.slice(0, text2Len) === text2) {
			start = start.slice(0, -text1Len);
			end = end.slice(text2Len);
			text1 = '';
			text2 = '';
			mode = 2;
		}
		if (
			middle.slice(0, text1Len) === text1 &&
			middle.slice(-text2Len) === text2
		) {
			middle = middle.slice(text1Len, -text2Len);
			text1 = '';
			text2 = '';
			mode = 3;
		}
	}
	target.value = start + text1 + middle + text2 + end;
	switch (mode) {
		case 0:
			target.selectionStart = selectionStart + text1Len;
			target.selectionEnd = selectionEnd + text1Len;
			break;
		case 1:
			target.selectionStart = selectionStart + text1Len;
			target.selectionEnd = target.selectionStart + middle.length;
			break;
		case 2:
			target.selectionStart = selectionStart - text1Len;
			target.selectionEnd = selectionEnd - text2Len;
			break;
		case 3:
			target.selectionStart = selectionStart;
			target.selectionEnd = selectionEnd - text2Len;
		default:
			break;
	}
};

export default format;
