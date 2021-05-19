/* eslint-disable import/no-anonymous-default-export */
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import external from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

export default {
	input: "./src/index.ts",
	output: [
		{ file: "../dist/index.esm.js", format: "esm", exports: "named", sourcemap: true },
		{ file: "../dist/index.cjs.js", format: "cjs", exports: "named", sourcemap: true }
	],
	plugins: [
		external(),
		del({ targets: ["dist/*"] }),
		resolve(),
		commonjs(),
		typescript({ typescript: require("typescript"), useTsconfigDeclarationDir: true }),
		copy({
			targets: [
				{
					src: "../package.json",
					dest: "../dist/",
					transform: (contents) => contents.toString().replace(/dist\//g, "./")
				}
			]
		})
	],
	external: Object.keys(pkg.peerDependencies || {})
};
