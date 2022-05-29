import { Box } from '@chakra-ui/react';
import React, { useRef } from 'react';

import Title from './Title';
import Toolbox from './Toolbox';
import Body from './Body';

function Index() {
	const bodyRef = useRef<HTMLTextAreaElement>(null);
	return (
		<Box as="form" bg="white" p="2">
			<Title />
			<Toolbox target={bodyRef} />
			<Body ref={bodyRef} target={bodyRef} />
		</Box>
	);
}

export default Index;
