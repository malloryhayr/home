import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { ArrowLeft, Home } from 'react-feather';
import { BlogPostFile, getPostPaths } from 'lib/blog';
import styled from 'styled-components';

export default function Post({
	year,
	month,
	post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const postFile: BlogPostFile = require(`posts/${year}/${month}/${post}/${post}.mdx`);
	const { default: PostContent, meta } = postFile;

	return (
		<MDXProvider components={{}}>
			<Link href="/" passHref>
				<a>
					<BlogPostHomeLink>
						<ArrowLeft width={18} height={18} style={{ marginRight: '8px' }} />
						Back
					</BlogPostHomeLink>
				</a>
			</Link>
			<BlogDate rawDate={meta.date} />
			<h1
				style={{
					fontSize: '45px',
					marginBottom: '2rem',
				}}
			>
				{meta.title}
			</h1>
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

const BlogDate = ({ rawDate }: { rawDate: string }) => {
	dayjs.extend(customParseFormat);
	const date = dayjs(rawDate, 'DD-MM-YY');

	return (
		<span
			style={{
				color: 'rgba(255, 255, 255, 0.6)',
				textTransform: 'uppercase',
				letterSpacing: '1.5px',
				fontSize: '16px',
			}}
		>
			{date.format('MMMM DD, YYYY')}
		</span>
	);
};

const BlogPostHomeLink = styled.span`
	display: flex;
	align-items: center;
	margin-bottom: 18px;
	color: #86878a;

	transition: color 0.125s;

	&:hover {
		color: magenta;
	}
`;
