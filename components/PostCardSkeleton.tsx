import {
	SkeletonCircle,
	SkeletonText,
	VStack,
	HStack,
	Skeleton,
	Box,
} from '@chakra-ui/react';

function PostCardSkeleton() {
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
			<HStack>
				<SkeletonCircle w="12" h="12" />
				<VStack alignItems="flex-start">
					<SkeletonText w="12" noOfLines={1} />
					<SkeletonText w="20" noOfLines={1} />
				</VStack>
			</HStack>
			<Box w="full">
				<SkeletonText w="90%" noOfLines={3} />
			</Box>
			<HStack justifyContent="space-between" w="full">
				<Skeleton w="16" h="10" rounded="md" />
				<SkeletonText w="20" noOfLines={1} />
			</HStack>
		</VStack>
	);
}

export default PostCardSkeleton;
