const withPWA = require('next-pwa')

module.exports = withPWA({
	pwa: {
		dest: 'public'
	},
	target: 'serverless',
	images: {
		domains: ['thesportsdb.com', 'www.thesportsdb.com']
	}
})