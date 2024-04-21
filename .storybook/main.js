const path = require("path");

module.exports = {
	stories: ["../src/**/*.@(mdx|stories.@(tsx))"],

	addons: [
		"@storybook/addon-actions",
		"@storybook/addon-links",
		{
			name: "@storybook/addon-docs",
			options: {
				configureJSX: true,
				inlineStories: true,
			},
		},
		"@storybook/addon-mdx-gfm",
		"@storybook/addon-webpack5-compiler-babel",
		"@chromatic-com/storybook",
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

	framework: {
		name: "@storybook/react-webpack5",

		options: {
			strictMode: true,
		},
	},

	docs: {
		autodocs: true,
		story: {
			inline: true,
			height: "500px",
		},
	},
};
