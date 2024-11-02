/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	daisyui: {
		themes: ['light'],
	},
	theme: {
		extend: {},
	},
	plugins: [
		require('daisyui'),
	],
};
