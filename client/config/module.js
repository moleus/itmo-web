const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
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
}
