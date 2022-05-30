import TextareaAutosize from 'react-textarea-autosize';
import { Textarea } from '@chakra-ui/react';
import React from 'react';

type Props = {
	title?: string;
};

function Title({ title }: Props) {
	const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};

	return (
		<Textarea
			as={TextareaAutosize}
			onKeyDown={onKeyDown}
			resize="none"
			fontSize="4xl"
			fontWeight="bold"
			placeholder="New post title here..."
			defaultValue={title}
			name="title"
			required
		/>
	);
}

export default Title;
