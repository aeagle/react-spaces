module.exports = {
	extends: ['airbnb'],
	env: {
		browser: true,
	},
	parser: 'babel-eslint',
	rules: {
		indent: 0,
		'no-tabs': 0,
		'eol-last': ['error', 'always'],
		'no-underscore-dangle': 0,
		'no-unused-vars': 0,
		'react/jsx-indent': 0,
		'react/jsx-indent-props': 0,
		'react/jsx-filename-extension': 0,
		'react/forbid-prop-types': 0,
		'react/require-default-props': 0,
	},
};