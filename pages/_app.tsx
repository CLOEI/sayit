import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import NextProgress from 'next-progress';

import { AuthProvider } from '../hooks/useAuth';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<NextProgress options={{ showSpinner: false }} />
				<Toaster />
				<Component {...pageProps} />
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;
