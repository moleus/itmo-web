const webpack = require("webpack");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const moduleConfig = require('./config/module');
const styleEntries = require('./config/styleEntries')

const devServer = {
    devMiddleware: {
        writeToDisk: true
    },
    open: false,
    hot: false,
    static: false,
    port: 9999,
    watchFiles: [
        path.resolve(__dirname, 'styles/**/*.scss'),
        path.resolve(__dirname, 'scripts/**/*.ts'),
    ]
}

const config = {
    entry: styleEntries.entryPoints,
    module: moduleConfig,
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../src/main/webapp/static"),
    },
    optimization: {
        splitChunks: {
            cacheGroups: styleEntries.cacheGroups
        }
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new CleanWebpackPlugin(),
    ],
}

module.exports = (env) => {
    if (env.production) {
        config["mode"] = "production"
    } else {
        config["mode"] = "development"
        config["devServer"] = devServer
    }
    return config
}
