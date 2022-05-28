import { Avatar, HStack, VStack, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import TimeAgo from 'react-timeago';

function PostHeader({ avatar_url, name, id, created_at, user_id }: Post) {
	return (
		<HStack justifyContent="space-between">
			<HStack>
				<Avatar name={name} src={avatar_url} />
				<VStack alignItems="flex-start" spacing={0}>
					<Text fontSize="sm">{name}</Text>
					<Text fontSize="xs">
						<TimeAgo date={created_at} />
					</Text>
				</VStack>
			</HStack>
		</HStack>
	);
}

export default PostHeader;
