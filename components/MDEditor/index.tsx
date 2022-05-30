import { Button, chakra } from '@chakra-ui/react';
import React, { useRef } from 'react';

import Title from './Title';
import Toolbox from './Toolbox';
import Body from './Body';

type Props = {
	cb: (title: string, body: string) => Promise<void>;
	title?: string;
	body?: string;
};

function Index({ cb, title, body }: Props) {
	const bodyRef = useRef<HTMLTextAreaElement>(null);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// little hacky here.. would like to replace it if found better alternative
		const title = (e.target as any).title as HTMLTextAreaElement;
		const body = (e.target as any).body as HTMLTextAreaElement;

		cb(title.value, body.value).then(() => (e.target as HTMLFormElement).reset());
	};

	return (
		<chakra.form onSubmit={onSubmit} as="form" bg="white" p="2">
			<Title title={title} />
			<Toolbox target={bodyRef} />
			<Body ref={bodyRef} target={bodyRef} body={body} />
			<Button type="submit" my="2" colorScheme="whatsapp">
				Submit
			</Button>
		</chakra.form>
	);
}

export default Index;
