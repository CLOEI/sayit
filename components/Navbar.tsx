import {
	Button,
	HStack,
	Heading,
	IconButton,
	ButtonGroup,
	Menu,
	MenuButton,
	Avatar,
	MenuList,
	MenuItem,
	Flex,
	Spacer,
	Text,
	MenuDivider,
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { FiLogOut, FiMenu } from 'react-icons/fi';

import { useRouter } from 'next/router';

import { useAuth } from '../hooks/useAuth';

function Navbar(): JSX.Element {
	const router = useRouter();
	const auth = useAuth();

	const gotoHome = () => router.push('/');
	const gotoEnter = () => router.push('/enter');
	const gotoNew = () => router.push('/new');

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
			{auth.user ? (
				<Flex alignItems="center">
					<ButtonGroup colorScheme="whatsapp" spacing="1">
						<IconButton aria-label="Search post" icon={<AiOutlineSearch />} />
						<IconButton
							onClick={gotoNew}
							aria-label="Add post"
							icon={<AiOutlinePlus />}
						/>
					</ButtonGroup>
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
	);
}

export default Navbar;
