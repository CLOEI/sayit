import { toast } from 'react-hot-toast';

import { useRouter } from 'next/router';
import Head from 'next/head';

import { useAuth } from '../hooks/useAuth';
import MDEditor from '../components/MDEditor';
import Layout from '../components/Layout';
import supabase from '../supabase';

function New() {
	const router = useRouter();
	const auth = useAuth();

	if (!auth.user) {
		return router.replace('/enter');
	}

	const onSubmit = async (title: string, body: string) => {
		if (auth.user) {
			const toastId = toast.loading('Adding post...');
			const { data, error } = await supabase.from<Post>('posts').insert({
				title,
				body,
				user_id: auth.user.id,
			});
			if (error) {
				toast.error('Something went wrong', {
					id: toastId,
				});
			} else {
				toast.success('Post added!', {
					id: toastId,
				});
				router.push(`/posts/${data[0].id}`);
			}
		} else {
			router.push('/enter');
		}
	};
	return (
		<Layout>
			<Head>
				<title>New post - Sayit </title>
			</Head>
			<MDEditor cb={onSubmit} />
		</Layout>
	);
}

export default New;
