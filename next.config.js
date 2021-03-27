// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

function useEsbuildMinify(config, options) {
	const terserIndex = config.optimization.minimizer.findIndex(minimizer => (minimizer.constructor.name === 'TerserPlugin'));
	if (terserIndex > -1) {
		config.optimization.minimizer.splice(
			terserIndex,
			1,
			new ESBuildMinifyPlugin(options),
		);
	}
}

function useEsbuildLoader(config, options) {
	const jsLoader = config.module.rules.find(rule => rule.test && rule.test.test('.js'));

	if (jsLoader) {
		jsLoader.use.loader = 'esbuild-loader';
		jsLoader.use.options = options;
	}
}

module.exports = withPWA({
	webpack: ( config, { webpack } ) => {
		config.plugins.push(
			new webpack.ProvidePlugin({
				React: 'react',
			}),
		);

		useEsbuildMinify(config);
		useEsbuildLoader(config, {
			loader: 'tsx',
			target: 'es2017',
		});

		return config;
	},
	pwa: {
		dest: 'public',
		mode: 'production',
		disable: process.env.NODE_ENV !== 'production',
	},
	target: 'serverless',
	images: {
		domains: [
			'thesportsdb.com',
			'www.thesportsdb.com',
			'media.api-sports.io',
			'https://media.api-sports.io',
			'https://crests.football-data.org',
			'crests.football-data.org',
			'https://football-data.org',
			'football-data.org',
		],
	},
})
