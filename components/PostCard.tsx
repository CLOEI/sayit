import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';

import { useRouter } from 'next/router';
import Link from 'next/link';

import PostHeader from './PostHeader';
import { Button, ButtonGroup, HStack, Text, VStack } from '@chakra-ui/react';

interface Props extends Post {
	refresh?: () => Promise<void>;
}

function PostCard(props: Props) {
	const router = useRouter();
	const wpm = 200; // normal human reading speed
	const estimated = props.body.match(/[a-zA-Z0-9]/g)!.length / wpm;
	const minutes = Math.round(estimated);

	const gotoComments = () => router.push(`/post/${props.id}#comments`);

	return (
		<VStack
			bg="white"
			px="4"
			pt="4"
			pb="3"
			w="full"
			boxShadow="sm"
			spacing="4"
			alignItems="flex-start"
		>
			<PostHeader {...props} />
			<div>
				<Text as="h2">
					<Link href={`/posts/${props.id}`} passHref>
						<Text as="a" fontSize="xl" fontWeight="bold">
							{props.title}
						</Text>
					</Link>
				</Text>
			</div>
			<HStack justifyContent="space-between" w="full">
				<ButtonGroup variant="outline">
					<Button onClick={gotoComments} leftIcon={<AiOutlineComment />}>
						<span>{props.comment_count || 0}</span>
					</Button>
				</ButtonGroup>
				<Text>{minutes < 1 ? 'a couple of secs' : `${minutes} min read`}</Text>
			</HStack>
		</VStack>
	);
}

export default PostCard;
