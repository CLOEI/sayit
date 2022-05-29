import { Textarea } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

type Props = {
	target: React.RefObject<HTMLTextAreaElement>;
};

const Body = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
	console.log(props.target.current);
	return (
		<Textarea resize="none" ref={ref} placeholder="Write content body here..." />
	);
});

Body.displayName = 'Markdown Body';

export default Body;
