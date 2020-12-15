const withPWA = require('next-pwa')

module.exports = withPWA({
	pwa: {
		dest: 'public',
		mode: 'production'
	},
	target: 'serverless',
	images: {
		domains: ['thesportsdb.com', 'www.thesportsdb.com']
	}
})