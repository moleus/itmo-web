const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: "./scripts/main.ts",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new MiniCssExtractPlugin({
            filename: "main.css",
        }),
        new CleanWebpackPlugin(),
    ],
};
