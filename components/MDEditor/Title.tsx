import { Textarea } from '@chakra-ui/react';
import React from 'react';

function Title() {
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.target.style.height = 'auto';
		e.target.style.height = `${e.target.scrollHeight}px`;
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};

	return (
		<Textarea
			onChange={onChange}
			onKeyDown={onKeyDown}
			resize="none"
			fontSize="4xl"
			fontWeight="bold"
			placeholder="New post title here..."
			required
		/>
	);
}

export default Title;
