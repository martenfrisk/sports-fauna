// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')

module.exports = {
	plugins: [ new webpack.DefinePlugin({ 'global.GENTLY': false }) ]
}
