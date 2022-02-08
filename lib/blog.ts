import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');

interface BlogPostPath {
	year: string;
	month: string;
	slug: string;
}

interface BlogPostMeta {
	title: string;
}

interface BlogPostData {
	path: BlogPostPath;
	meta: BlogPostMeta;
	content: string;
}

export function getPostPaths(): BlogPostPath[] {
	return fs
		.readdirSync(POSTS_DIRECTORY)
		.map(year =>
			fs
				.readdirSync(path.join(POSTS_DIRECTORY, year))
				.map(month =>
					fs
						.readdirSync(path.join(POSTS_DIRECTORY, year, month))
						.map(slug => ({ year, month, slug }))
				)
		)
		.flat(2);
}

export function getPost(post: BlogPostPath): BlogPostData {
	const fullPath = path.join(
		POSTS_DIRECTORY,
		post.year,
		post.month,
		post.slug,
		`${post.slug}.md`
	);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data: meta, content } = matter(fileContents);

	return {
		path: post,
		meta: meta as BlogPostMeta,
		content,
	};
}

export function getAllPosts() {
	const paths = getPostPaths();
	return paths.map(x => getPost(x));
}
