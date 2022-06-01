import {
	Avatar,
	HStack,
	VStack,
	Text,
	Menu,
	MenuButton,
	IconButton,
	MenuList,
	MenuItem,
	Flex,
	useDisclosure,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';
import { BsThreeDotsVertical, BsTrash, BsPencilSquare } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { useRef } from 'react';
import TimeAgo from 'react-timeago';

import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import supabase from '../supabase';

interface Props extends Post {
	refresh?: () => Promise<void>;
}

function PostHeader({
	avatar_url,
	name,
	id,
	created_at,
	user_id,
	refresh,
}: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef(null);
	const router = useRouter();
	const auth = useAuth();

	const deletePost = async () => {
		if (auth.user?.id === user_id) {
			const toastId = toast.loading('Deleting post...');
			const { error } = await supabase.from('posts').delete().eq('id', id);
			if (error)
				toast.error('Error deleting post', {
					id: toastId,
				});
			toast.success('Successfully deleted the post', {
				id: toastId,
			});
			if (refresh) refresh();
			onClose();
			router.push('/');
		} else {
			toast.error('You can only delete your own posts');
		}
	};

	const gotoEdit = () => router.push(`/edit/${id}`);

	return (
		<Flex justifyContent="space-between" w="full">
			<HStack>
				<Avatar name={name} src={avatar_url} />
				<VStack alignItems="flex-start" spacing={0}>
					<Text fontSize="sm">{name}</Text>
					<Text fontSize="xs">
						<TimeAgo date={created_at} />
					</Text>
				</VStack>
			</HStack>
			{auth.user?.id === user_id && (
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<BsThreeDotsVertical />}
					/>
					<MenuList>
						<MenuItem onClick={gotoEdit} icon={<BsPencilSquare />}>
							Edit
						</MenuItem>
						<MenuItem onClick={onOpen} icon={<BsTrash />}>
							Delete
						</MenuItem>
					</MenuList>
				</Menu>
			)}
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Post
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can&apos;t undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="red" onClick={deletePost} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Flex>
	);
}

export default PostHeader;
