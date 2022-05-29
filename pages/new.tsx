import React from 'react';

import Head from 'next/head';

import MDEditor from '../components/MDEditor';
import Layout from '../components/Layout';

function New() {
	return (
		<Layout>
			<Head>
				<title>New post - Sayit </title>
			</Head>
			<MDEditor />
		</Layout>
	);
}

export default New;
