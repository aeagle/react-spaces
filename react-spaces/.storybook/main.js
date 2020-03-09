const path = require("path");

module.exports = {
	stories: ["../src/**/*.stories.(mdx|tsx)"],
	addons: ["@storybook/preset-typescript", "@storybook/addon-actions", "@storybook/addon-links", "@storybook/addon-docs/preset"],
	webpackFinal: async (config, { configType }) => {
		config.module.rules.push({
			test: /\.scss$/,
			use: ["style-loader", "css-loader", "sass-loader"],
			include: path.resolve(__dirname, "../"),
		});

		return config;
	},
};
