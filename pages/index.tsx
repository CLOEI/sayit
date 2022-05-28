import type { NextPage } from 'next';

import { useEffect, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import Layout from '../components/Layout';

import Head from 'next/head';

import PostCard from '../components/PostCard';
import supabase from '../supabase';

const Home: NextPage = () => {
	const [posts, setPosts] = useState<Post[] | null>(null);

	useEffect(() => {
		(async () => {
			const { data, error } = await supabase
				.rpc<Post>('get_posts')
				.order('id', { ascending: false });

			if (error) throw error;
			setPosts(data);
		})();
	}, []);

	return (
		<Layout>
			<Head>
				<title>Sayit</title>
			</Head>
			<VStack spacing="2" mt="2">
				{posts &&
					posts.map((post) => {
						return <PostCard key={post.id} {...post} />;
					})}
			</VStack>
		</Layout>
	);
};

export default Home;
