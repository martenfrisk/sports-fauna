module.exports = {
	purge: {
		enabled: process.env.NODE_ENV !== 'development',
		// mode: 'all',
		content: [
			'./pages/**/*.{js,jsx,ts,tsx}',
			'./components/**/*.{js,jsx,ts,tsx}',
		],
	},	
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/custom-forms')
	],
}
