import { extendTheme } from '@chakra-ui/react';

const styles = {
	global: {
		body: {
			backgroundColor: 'gray.100',
		},
	},
};

const theme = extendTheme({ styles });

export default theme;
