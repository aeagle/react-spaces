import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import sourcemaps from "rollup-plugin-sourcemaps";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";

const commonPlugins = [typescript({ typescript: require("typescript"), sourceMap: true }), resolve(), commonjs(), sourcemaps()];

const targets = [
	{
		output: {
			file: pkg.main,
			format: "cjs",
		},
		plugins: [
			postcss({
				extract: false,
				extensions: [".css"],
			}),
			...commonPlugins,
			babel({ exclude: "node_modules/**" }),
		],
	},
	{
		output: {
			file: pkg.module,
			format: "es",
		},
		plugins: [
			postcss({
				extract: false,
				extensions: [".css"],
			}),
			...commonPlugins,
		],
	},
	{
		output: {
			file: "dist/server.js",
			format: "cjs",
		},
		plugins: [
			postcss({
				extract: true,
				extensions: [".css"],
			}),
			...commonPlugins,
			babel({ exclude: "node_modules/**" }),
		],
	},
	{
		output: {
			file: "dist/es/server.js",
			format: "es",
		},
		plugins: [
			postcss({
				extract: true,
				extensions: [".css"],
			}),
			...commonPlugins,
		],
	},
];

export default [
	...targets.map((t) => ({
		...t,
		...{
			input: "src/index.ts",
			output: { ...t.output, ...{ sourcemap: true } },
			external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
		},
	})),
	...targets.map((t) => ({
		...t,
		...{
			input: "src/experimental.ts",
			output: { ...t.output, ...{ file: t.output.file.replace("dist", "dist/experimental"), sourcemap: true } },
			external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
		},
	})),
];
