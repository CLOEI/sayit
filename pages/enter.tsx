import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { FiGithub } from 'react-icons/fi';

import Head from 'next/head';

import { useAuth } from '../hooks/useAuth';
import Layout from '../components/Layout';

function Enter() {
	const auth = useAuth();

	return (
		<Layout>
			<VStack spacing="4" bg="white" py="10">
				<Head>
					<title>Welcome! - Sayit</title>
				</Head>
				<Container textAlign="center">
					<Heading>Welcome to Sayit</Heading>
					<Text>Sign up so you can post!</Text>
				</Container>
				<VStack>
					<Button
						onClick={() => auth.signInWithGithub()}
						leftIcon={<FiGithub />}
						colorScheme="gray"
					>
						<span>Sign up with GitHub</span>
					</Button>
				</VStack>
			</VStack>
		</Layout>
	);
}

export default Enter;
