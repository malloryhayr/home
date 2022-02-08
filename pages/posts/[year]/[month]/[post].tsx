import { GetStaticPropsContext } from 'next';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

import {
	BlogPostMeta,
	BlogPostPath,
	getAllPosts,
	getPost,
	processMarkdown,
} from 'lib/blog';

export default function BlogPost({
	path,
	meta,
	processedContent,
}: PropsWithChildren<{
	path: BlogPostPath;
	meta: BlogPostMeta;
	processedContent: string;
}>) {
	return (
		<>
			<BlogPostBody dangerouslySetInnerHTML={{ __html: processedContent }} />
		</>
	);
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	if (params && params.year && params.month && params.post) {
		const post = getPost({
			year: params.year as string,
			month: params.month as string,
			slug: params.post as string,
		});

		const content = await processMarkdown(post.content);

		return {
			props: {
				...post,
				processedContent: content,
			},
		};
	}
}

export async function getStaticPaths() {
	const posts = getAllPosts();

	return {
		paths: posts.map(post => ({
			params: {
				year: post.path.year,
				month: post.path.month,
				post: post.path.slug,
			},
		})),
		fallback: false,
	};
}

const BlogPostBody = styled.p`
	font-size: 18px;
	color: rgba(255, 255, 255, 0.8);
	line-height: 2rem;

	h1 {
	}

	h2 {
	}

	h3 {
	}

	p {
	}

	a {
		color: magenta;
		font-weight: 500;
		&:hover {
			text-decoration: underline;
		}
	}

	pre {
		code {
			padding-left: 4px;
			padding-right: 4px;
			background-color: rgba(255, 255, 255, 0.1);
		}
	}

	code {
		background-color: rgba(255, 255, 255, 0.1);
		padding: 4px;
	}
`;
