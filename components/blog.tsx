import { PropsWithChildren } from 'react';
// import { MDXProvider } from '@mdx-js/react';

export interface BlogPostMeta {
	title: string;
	date: string;
}

export const BlogPost = (props: PropsWithChildren<{ meta: BlogPostMeta }>) => {
	return (
		<>
			<h1>
				title: {props.meta.title}
				date: {props.meta.date}
			</h1>
			<p>{props.children}</p>
		</>
	);
};
