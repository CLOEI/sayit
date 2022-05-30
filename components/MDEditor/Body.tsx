import TextareaAutosize from 'react-textarea-autosize';
import { Textarea } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

import format from './utils/format';

type Props = {
	target: React.RefObject<HTMLTextAreaElement>;
};

const Body = forwardRef<HTMLTextAreaElement, Props>(({ target }, ref) => {
	const bodyKeyHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.ctrlKey) {
			switch (e.key) {
				case 'b':
					format(target.current, '**');
					break;
				case 'i':
					format(target.current, '*');
					break;
				case 'k':
					e.preventDefault();
					format(target.current, '[](', 'url', ')');
					break;
				case 'u':
					e.preventDefault();
					format(target.current, '<u>', ' ', '</u>');
					break;
				case 's':
					e.preventDefault();
					format(target.current, '~~');
				default:
					break;
			}
		}
	};

	return (
		<Textarea
			as={TextareaAutosize}
			onKeyDown={bodyKeyHandler}
			resize="none"
			ref={ref}
			placeholder="Write content body here..."
			name="body"
		/>
	);
});

Body.displayName = 'Markdown Body';

export default Body;
