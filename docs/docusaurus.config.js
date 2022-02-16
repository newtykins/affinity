// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'affinity',
	tagline: '',
	url: 'https://affinity.newtt.me/',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'newtykins',
	projectName: 'affinity',
	trailingSlash: false,

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					routeBasePath: '/',
					// Please change this to your repo.
					editUrl:
						'https://github.com/newtykins/affinity/tree/main/docs',
				},
				blog: {
					showReadingTime: true,
					// Please change this to your repo.
					editUrl:
						'https://github.com/newtykins/affinity/tree/main/docs',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'affinity',
				items: [
					{
						href: 'https://github.com/newtykins/affinity',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			footer: {
				style: 'dark',
				copyright: `Copyright © ${new Date().getFullYear()} newtykins. Affinity is licensed under the <strong><a href="https://oql.avris.it/license?c=newtykins">OQL license</a></strong>.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
			metadata: [
				{
					name: 'keywords',
					content: 'osu, api, wrapper, newtykins, newt',
				},
			],
		}),
};

module.exports = config;
