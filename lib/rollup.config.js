/* eslint-disable import/no-anonymous-default-export */
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import external from "rollup-plugin-peer-deps-external";
import pkg from "../package.json";

export default [
	{
		input: "./src/index.tsx",
		output: [
			{
				file: "../" + pkg.main,
				format: "cjs",
				exports: "named",
				sourcemap: true
			},
			{
				file: "../" + pkg.module,
				format: "esm",
				exports: "named",
				sourcemap: true
			}
		],
		external: ["react", "react-dom", "styled-components"],
		plugins: [
			external({ packageJsonPath: "../package.json" }),
			resolve(),
			commonjs(),
			typescript({
				useTsconfigDeclarationDir: true,
				tsconfig: "tsconfig.json"
			}),
			copy({
				targets: [
					{
						src: "../package.json",
						dest: "../dist",
						transform: contents => contents.toString().replace(/dist\//g, "./")
					}
				]
			})
		]
	}
];
