import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	HStack,
	Text,
	VStack,
	useDisclosure,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Textarea,
} from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import TimeAgo from 'react-timeago';

import { useAuth } from '../hooks/useAuth';
import supabase from '../supabase';

interface Props extends Reply {
	refresh: () => Promise<void>;
	isReplies: boolean;
}

type FormData = {
	reply: string;
};

function ReplyCard(props: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, isSubmitSuccessful },
	} = useForm<FormData>();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isReplyToggled, setIsReplyToggled] = useState(false);
	const cancelRef = useRef(null);
	const auth = useAuth();

	useEffect(() => {
		reset({
			reply: '',
		});
		setIsReplyToggled(false);
	}, [isSubmitSuccessful, reset]);

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (auth.user?.id === props.user_id) {
			const toastId = toast.loading('Deleting comment...');
			const { error } = await supabase
				.from('comments')
				.delete()
				.eq('id', props.id);

			if (error) {
				return toast.error('Error deleting comment', {
					id: toastId,
				});
			} else {
				toast.success('Comment deleted', {
					id: toastId,
				});
				onClose();
				props.refresh();
			}
		}
	};

	const onSubmit = handleSubmit(async (formData) => {
		if (auth.user) {
			const toastId = toast.loading('Sending reply...');
			const { error } = await supabase.from<Reply>('comments').insert({
				content: formData.reply,
				post_id: props.post_id,
				user_id: auth.user.id,
				reply_to: props.author_name,
				parent_id: props.isReplies ? props.parent_id : props.id,
			});
			if (error) {
				return toast.error('Error sending reply', {
					id: toastId,
				});
			} else {
				toast.success('Reply sent', {
					id: toastId,
				});
				props.refresh();
			}
		} else {
			toast.error('You must be logged in to reply');
		}
	});

	const toggleReply = () => setIsReplyToggled(!isReplyToggled);

	return (
		<HStack alignItems="flex-start" w="full">
			<Avatar
				size="sm"
				name={props.author_name}
				src={props.author_profile}
				mt="1"
			/>
			<VStack w="full" alignItems="flex-start" spacing="4">
				<VStack spacing="2" alignItems="flex-start" w="full">
					<Box w="full" rounded="md" border="2px" borderColor="gray.200">
						<Box px="3" pt="2">
							<Text>
								{props.isReplies ? (
									<>
										{props.author_name} ﹥ {props.reply_to} •{' '}
										<TimeAgo date={props.created_at} />
									</>
								) : (
									<>
										{props.author_name} • <TimeAgo date={props.created_at} />
									</>
								)}
							</Text>
						</Box>
						<Box px="3" pt="2" pb="4">
							<Text>{props.content}</Text>
						</Box>
					</Box>
					{!isReplyToggled ? (
						<ButtonGroup size="sm">
							<Button onClick={toggleReply}>Reply</Button>
							{auth.user?.id === props.user_id && (
								<Button onClick={onOpen} variant="outline" colorScheme="red">
									Delete
								</Button>
							)}
						</ButtonGroup>
					) : (
						<VStack onSubmit={onSubmit} as="form" w="full" alignItems="flex-start">
							<Textarea
								resize="none"
								{...register('reply', { required: true, pattern: /\S/ })}
							/>
							<ButtonGroup>
								<Button type="submit" colorScheme="whatsapp" disabled={isSubmitting}>
									Submit
								</Button>
								<Button onClick={toggleReply}>Dismiss</Button>
							</ButtonGroup>
						</VStack>
					)}
				</VStack>
				{!props.isReplies && (
					<VStack spacing="4" w="full">
						{props.replies &&
							props.replies.map((reply) => {
								return (
									<ReplyCard
										key={reply.id}
										refresh={props.refresh}
										isReplies={true}
										{...reply}
									/>
								);
							})}
					</VStack>
				)}
			</VStack>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete reply
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can&apos;t undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="red" onClick={handleDelete} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</HStack>
	);
}

export default ReplyCard;
