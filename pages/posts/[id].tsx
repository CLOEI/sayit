import type { GetServerSideProps } from 'next';

import {
	Avatar,
	Box,
	Button,
	Heading,
	HStack,
	Text,
	Textarea,
	VStack,
} from '@chakra-ui/react';
import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TimeAgo from 'react-timeago';

import Head from 'next/head';

import { useAuth } from '../../hooks/useAuth';
import Layout from '../../components/Layout';
import supabase from '../../supabase';

import PostHeader from '../../components/PostHeader';
import ReplyCard from '../../components/ReplyCard';

type Props = {
	post: Post;
};

type FormData = {
	reply: string;
};

function Index({ post }: Props) {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { isSubmitting, isSubmitSuccessful },
	} = useForm<FormData>();
	const [replies, setReplies] = useState<Reply[] | null>(null);
	const auth = useAuth();

	const fetchReplies = useCallback(async () => {
		const { data: dbData, error } = await supabase
			.rpc<Reply>('get_comments_with_profile')
			.eq('post_id', post.id)
			.order('created_at', { ascending: false });

		if (error) throw error;
		setReplies(dbData);
	}, [post.id]);

	useEffect(() => {
		fetchReplies();
	}, [fetchReplies]);

	useEffect(() => {
		reset({
			reply: '',
		});
	}, [isSubmitSuccessful, reset]);

	const onSubmit = handleSubmit(async (formData) => {
		if (auth.user) {
			const toastId = toast.loading('Sending comment...');
			const { error } = await supabase.from<Reply>('comments').insert({
				content: formData.reply,
				post_id: post.id,
				user_id: auth.user.id,
			});

			if (error) {
				return toast.error('Error sending comment', {
					id: toastId,
				});
			} else {
				toast.success('Comment sent', {
					id: toastId,
				});
				fetchReplies();
			}
		} else {
			toast.error('You must be logged in to comment');
		}
	});

	return (
		<Layout>
			<Head>
				<title>{post.title}</title>
			</Head>
			<Box bg="white" p="3">
				<PostHeader {...post} />
				<Box my="2">
					<Heading as="h1">{post.title}</Heading>
				</Box>
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
				{post.updated_at && (
					<Text display="block" ml="auto" w="max" my="4">
						Updated <TimeAgo date={post.updated_at} />
					</Text>
				)}
				<Box mt="3">
					<Heading fontSize="xl" mb="6">
						Discussion ({post.comment_count || 0})
					</Heading>
				</Box>
				<HStack onSubmit={onSubmit} as="form" alignItems="flex-start">
					<Avatar
						size="sm"
						name={auth.user?.user_metadata.name || 'Anon'}
						src={auth.user?.user_metadata.avatar_url}
						mt="1"
					/>
					<VStack w="full" alignItems="flex-start">
						<Textarea
							resize="none"
							{...register('reply', { required: true, pattern: /\S/ })}
						/>
						{!!watch('reply') && (
							<Button disabled={isSubmitting} type="submit">
								Submit
							</Button>
						)}
					</VStack>
				</HStack>
				<VStack mt="4" spacing="1">
					{replies &&
						replies.map((reply) => {
							return (
								<ReplyCard
									key={reply.id}
									refresh={fetchReplies}
									isReplies={false}
									{...reply}
								/>
							);
						})}
				</VStack>
			</Box>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const query = ctx.query;
	const { data, error } = await supabase
		.rpc('get_posts')
		.eq('id', query.id)
		.single();

	if (error) throw error;

	return {
		props: {
			post: data,
		},
	};
};

export default Index;
