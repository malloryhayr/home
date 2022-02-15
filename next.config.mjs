import remarkGfm from 'remark-gfm';

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	experimental: { esmExternals: true },
	pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
	webpack(config, options) {
		config.module.rules.push({
			test: /\.mdx?$/,
			use: [
				// The default `babel-loader` used by Next:
				options.defaultLoaders.babel,
				{
					loader: '@mdx-js/loader',
					/** @type {import('@mdx-js/loader').Options} */
					options: {
						/* jsxImportSource: …, otherOptions… */
						remarkPlugins: [remarkGfm],
						rehypePlugins: [],
					},
				},
			],
		});

		return config;
	},
};

export default config;
