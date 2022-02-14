import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { MDXProvider } from '@mdx-js/react';

import { getPostPaths } from 'lib/blog';

export default function Post({
	year,
	month,
	post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const PostContent =
		require(`posts/${year}/${month}/${post}/${post}.mdx`).default;
	return (
		<MDXProvider>
			<PostContent />
		</MDXProvider>
	);
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	if (params && params.year && params.month && params.post) {
		return {
			props: {
				year: params.year,
				month: params.month,
				post: params.post,
			},
		};
	}
}

export async function getStaticPaths() {
	const paths = getPostPaths();

	return {
		paths: paths.map(path => ({
			params: path,
		})),
		fallback: false,
	};
}
