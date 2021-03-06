import type { NextPage } from 'next';

import { useEffect, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import Layout from '../components/Layout';

import Head from 'next/head';

import PostCard from '../components/PostCard';
import supabase from '../supabase';
import PostCardSkeleton from '../components/PostCardSkeleton';

const Home: NextPage = () => {
	const [posts, setPosts] = useState<Post[] | null>(null);

	useEffect(() => {
		fetchAndSetPosts();
	}, []);

	const fetchAndSetPosts = async () => {
		const { data, error } = await supabase
			.rpc<Post>('get_posts')
			.order('id', { ascending: false });

		if (error) throw error;
		setPosts(data);
	};

	return (
		<Layout>
			<Head>
				<title>Sayit</title>
			</Head>
			<VStack spacing="2" mt="2" maxW="5xl" mx="auto">
				{posts ? (
					posts.map((post) => {
						return <PostCard key={post.id} refresh={fetchAndSetPosts} {...post} />;
					})
				) : (
					<>
						<PostCardSkeleton />
						<PostCardSkeleton />
					</>
				)}
			</VStack>
		</Layout>
	);
};

export default Home;
