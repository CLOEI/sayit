import {
	Button,
	HStack,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	Avatar,
	MenuList,
	MenuItem,
	Flex,
	Spacer,
	Text,
	MenuDivider,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	InputGroup,
	InputLeftElement,
	Input,
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import { FiLogOut, FiMenu } from 'react-icons/fi';

import { useRouter } from 'next/router';

import { useAuth } from '../hooks/useAuth';
import debounce from '../utils/debounce';
import supabase from '../supabase';
import PostCard from './PostCard';

function Navbar(): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [searchData, setSearchData] = useState<Post[] | null>([]);
	const router = useRouter();
	const auth = useAuth();

	const gotoHome = () => router.push('/');
	const gotoEnter = () => router.push('/enter');
	const gotoNew = () => router.push('/new');

	const fetchAndSetSearchData = async (text: string) => {
		const { data, error } = await supabase
			.rpc<Post>('get_posts')
			.select('*')
			.textSearch('title', text);

		if (error) throw error;
		setSearchData(data);
	};

	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		fetchAndSetSearchData(e.target.value);
	};

	const debouncedSearch = debounce(onSearchChange, 500);

	return (
		<HStack
			as="nav"
			pos="sticky"
			top="0"
			zIndex={10}
			bg="white"
			p={2}
			boxShadow="sm"
			justifyContent="space-between"
		>
			<Heading onClick={gotoHome} as="h1" cursor="pointer">
				Sayit
			</Heading>
			<HStack spacing="1">
				<IconButton
					onClick={onOpen}
					aria-label="Search post"
					icon={<AiOutlineSearch />}
					variant="outline"
				/>
				{auth.user ? (
					<Flex alignItems="center">
						<IconButton
							onClick={gotoNew}
							aria-label="Add post"
							icon={<AiOutlinePlus />}
							variant="outline"
						/>
						<Spacer w="2" />
						<Menu>
							<MenuButton as={IconButton} aria-label="Options" icon={<FiMenu />} />
							<MenuList>
								<HStack p="2">
									<Avatar
										name={auth.user.user_metadata.name}
										src={auth.user.user_metadata.avatar_url}
									/>
									<Text>{auth.user.user_metadata.name}</Text>
								</HStack>
								<MenuDivider />
								<MenuItem onClick={() => auth.signOut()} icon={<FiLogOut />}>
									Logout
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				) : (
					<Button onClick={gotoEnter}>Create account</Button>
				)}
			</HStack>
			<Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader p={0}>
						<InputGroup variant="unstyled">
							<InputLeftElement
								pointerEvents="none"
								height="full"
								pos="absolute"
								left="4"
							>
								<AiOutlineSearch size={25} />
							</InputLeftElement>
							<Input
								onChange={debouncedSearch}
								placeholder="Search for posts"
								height="16"
								pl="16"
							/>
						</InputGroup>
					</ModalHeader>
					{searchData && searchData.length > 0 && (
						<ModalBody>
							{searchData.map((post) => {
								return <PostCard key={post.id} {...post} />;
							})}
						</ModalBody>
					)}
				</ModalContent>
			</Modal>
		</HStack>
	);
}

export default Navbar;
