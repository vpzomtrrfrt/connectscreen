const path = require('path');

module.exports = {
	entry: "./src/main.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js"
	},
	target: "electron-main",
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
	}
};
