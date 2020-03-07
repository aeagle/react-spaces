const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

module.exports = ({ config }) => {
	config.module.rules.push({
		test: /(stories|story)\.mdx$/,
		use: [
			{
				loader: "babel-loader",
				// may or may not need this line depending on your app's setup
				options: {
					plugins: ["@babel/plugin-transform-react-jsx"],
				},
			},
			{
				loader: "@mdx-js/loader",
				options: {
					compilers: [createCompiler({})],
				},
			},
		],
	});

	config.module.rules.push({
		test: /\.(stories|story)\.[tj]sx?$/,
		loader: require.resolve("@storybook/source-loader"),
		exclude: [/node_modules/],
		enforce: "pre",
	});

	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		use: [{ loader: require.resolve("awesome-typescript-loader") }, { loader: require.resolve("react-docgen-typescript-loader") }],
		exclude: [/node_modules/],
	});

	const cssModuleLoader = {
		loader: require.resolve("css-loader"),
		options: {
			modules: true,
			sourceMap: true,
			importLoaders: 2,
			modules: {
				localIdentName: "[name]__[local]__[hash:base64:5]",
			},
		},
	};

	config.module.rules.push({
		test: /\.scss$/,
		exclude: /node_modules/,
		loaders: [require.resolve("style-loader"), cssModuleLoader, require.resolve("sass-loader")],
	});

	config.resolve.extensions.push(".ts", ".tsx", ".scss", ".mdx");

	return config;
};
