import fs from 'node:fs';
import path from 'node:path';

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');

export interface BlogPostPath {
	year: string;
	month: string;
	post: string;
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
						.map(post => ({ year, month, post }))
				)
		)
		.flat(2);
}
