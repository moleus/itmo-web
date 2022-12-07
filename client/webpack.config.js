const path = require('path');
const dotenv = require('dotenv');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

dotenv.config();

const { APP_ENV = 'development' } = process.env;

module.exports = (_env) => {
    return {
        mode: APP_ENV,
        entry: path.join(__dirname, 'src', 'index.tsx'),
        target: 'web',

        devServer: {
            port: 3000,
            historyApiFallback: true,
            host: '127.0.0.1',
            allowedHosts: "all",
            hot: false,
            static: [
                {
                    directory: path.resolve(__dirname, 'public'),
                },
            ],
            devMiddleware: {
                stats: 'minimal',
            },
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js)$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            },
                        },
                        'postcss-loader',
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    exportLocalsConvention: 'camelCase',
                                    auto: true,
                                    localIdentName: '[hash:base64]'
                                }
                            }
                        },
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        output: {
            filename: '[name].[contenthash].js',
            chunkFilename: '[id].[chunkhash].js',
            assetModuleFilename: '[name].[contenthash][ext]',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[name].[chunkhash].css',
                ignoreOrder: true,
            }),
        ]
    }
}