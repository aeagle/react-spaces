import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import sourcemaps from "rollup-plugin-sourcemaps";
import postcss from "rollup-plugin-postcss";
import { uglify } from "rollup-plugin-uglify";
import pkg from "./package.json";

const commonPlugins = [
	typescript({
		typescript: require("typescript"),
		sourceMap: true,
	}),
	resolve(),
	commonjs(),
	sourcemaps(),
];

const targets = [
	{
		output: {
			file: pkg.main,
			format: "cjs",
		},
		plugins: [
			postcss({
				extract: false,
			}),
			...commonPlugins,
			babel({ babelHelpers: "runtime", exclude: "node_modules/**" }),
			uglify(),
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
			}),
			...commonPlugins,
			babel({ babelHelpers: "runtime", exclude: "node_modules/**" }),
			uglify(),
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
];
