module.exports = {
	clearMocks: true,
	globals: {
		"ts-jest": {
			tsconfig: {
				target: "es2017",
			},
		},
	},
	moduleFileExtensions: ["js", "json", "jsx", "node", "ts", "tsx"],
	setupFilesAfterEnv: ["jest-expect-message"],
	testEnvironment: "jsdom",
	testPathIgnorePatterns: ["\\\\node_modules\\\\", "^.+\\.d.ts?$"],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
	transformIgnorePatterns: ["\\\\node_modules\\\\", "^.+\\.d.ts?$"],
	preset: "ts-jest",
};
