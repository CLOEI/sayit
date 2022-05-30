import type { PostgrestError } from '@supabase/supabase-js';
import type { GetServerSideProps } from 'next';

import { toast } from 'react-hot-toast';

import { useRouter } from 'next/router';
import Error from 'next/error';
import Head from 'next/head';

import { useAuth } from '../../hooks/useAuth';
import MDEditor from '../../components/MDEditor';
import Layout from '../../components/Layout';
import supabase from '../../supabase';

type Props = {
	post: Post;
	error: PostgrestError | null;
};

function Index({ post, error }: Props) {
	const router = useRouter();
	const auth = useAuth();

	if (error) {
		return <Error statusCode={404} title="Post not found" />;
	}

	if (!auth.user || auth.user.id !== post.user_id) {
		toast.error('You are not authorized to edit this post.');
		router.push('/');
	}

	const onSubmit = async (title: string, body: string) => {
		if (auth.user) {
			const toastId = toast.loading('Editing post...');
			const { data, error } = await supabase
				.from<Post>('posts')
				.update({
					title,
					body,
				})
				.match({ id: post.id });
			if (error) {
				toast.error('Something went wrong', {
					id: toastId,
				});
			} else {
				toast.success('Post edited!', {
					id: toastId,
				});
				router.push(`/posts/${data[0].id}`);
			}
		} else {
			router.push('/enter');
		}
	};

	return (
		<Layout>
			<Head>
				<title>Edit post - Sayit </title>
			</Head>
			<MDEditor cb={onSubmit} title={post.title} body={post.body} />
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { id } = ctx.query;
	const { data, error } = await supabase
		.rpc<Post>('get_posts')
		.eq('id', id!.toString())
		.single();

	return {
		props: {
			post: data,
			error,
		},
	};
};

export default Index;
