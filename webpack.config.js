const path = require('path');

const HtmlPlugin = require('html-webpack-plugin');

const common = {
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: [
					path.resolve(__dirname, "src")
				],
				loader: "ts-loader"
			}
		]
	},
	resolve: {
		extensions: [".js", ".ts", ".tsx"]
	}
};

module.exports = [
	{
		entry: "./src/main.ts",
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "index.js"
		},
		target: "electron-main",
		module: common.module,
		node: {
			__dirname: false
		},
		resolve: common.resolve
	},
	{
		entry: "./src/render.tsx",
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "render.js"
		},
		target: "electron-renderer",
		module: common.module,
		plugins: [new HtmlPlugin()],
		resolve: common.resolve
	}
];
