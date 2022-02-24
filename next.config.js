const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

/** @type {import('next').NextConfig} */
module.exports = withMDX({
	reactStrictMode: true,
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	images: {
		domains: ['cdn.discordapp.com', 'i.scdn.co', 'raw.githubusercontent.com'],
	},
});
