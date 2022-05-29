const path = require("path");

module.exports = {
	stories: ["../src/**/*.stories.@(mdx|tsx)"],
	addons: [
		"@storybook/addon-actions",
		"@storybook/addon-links",
		{
			name: "@storybook/addon-docs",
			options: {
				configureJSX: true,
				inlineStories: false,
			},
		},
	],
	webpackFinal: async (config, { configType }) => {
		if (process.env.NODE === "production") {
			config.output.publicPath = "/react-spaces/docs";
		}

		config.module.rules.push({
			test: /\.scss$/,
			use: ["style-loader", "css-loader", "sass-loader"],
			include: path.resolve(__dirname, "../"),
		});

		return config;
	},
	reactOptions: {
		strictMode: true,
	},
};
