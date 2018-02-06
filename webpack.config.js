module.exports = (env = {}) => {
    const isProduction = !!env.production;
    const isDevelopment = !isProduction;
    const sourceMapsEnabled = true;

    const path = require("path");
    const webpack = require("webpack");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const ExtractTextPlugin = isProduction ? require("extract-text-webpack-plugin") : undefined;
    const UglifyJsPlugin = isProduction ? require("uglifyjs-webpack-plugin") : undefined;

    const styleLoaders = {
        vue() {
            return {
                loader: "vue-style-loader",
                options: {
                    sourceMap: sourceMapsEnabled,
                },
            };
        },
        style() {
            return {
                loader: "style-loader",
                options: {
                    sourceMap: sourceMapsEnabled,
                },
            };
        },
        css(loadersBefore) {
            return {
                loader: "css-loader",
                options: {
                    importLoaders: loadersBefore,
                    sourceMap: sourceMapsEnabled,
                },
            };
        },
        sass() {
            return {
                loader: "sass-loader",
                options: {
                    sourceMap: sourceMapsEnabled,
                    options: {
                        includePaths: [
                            path.join(__dirname, "src"),
                        ],
                    },
                },
            };
        },
    };

    return {
        context: path.resolve(__dirname),
        entry: {
            app: path.join(__dirname, "src/main.js"),
        },
        output: {
            path: path.join(__dirname, "dist"),
            filename: "[name].js",
            publicPath: "",
        },
        resolve: {
            extensions: [".js", ".jsx", ".vue"],
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            scss: (() => {
                                const styleLoader = styleLoaders.vue();
                                const loaders = [
                                    styleLoaders.css(1),
                                    styleLoaders.sass(),
                                ];

                                if (isDevelopment) {
                                    return [styleLoader].concat(loaders);
                                }

                                return ExtractTextPlugin.extract({
                                    fallback: styleLoader,
                                    use: loaders,
                                });
                            })(),
                            css: (() => {
                                const styleLoader = styleLoaders.vue();
                                const loaders = [
                                    styleLoaders.css(0),
                                ];

                                if (isDevelopment) {
                                    return [styleLoader].concat(loaders);
                                }

                                return ExtractTextPlugin.extract({
                                    fallback: styleLoader,
                                    use: loaders,
                                });
                            })(),
                            js: [
                                "babel-loader",
                            ],
                        },
                        cssSourceMap: sourceMapsEnabled,
                        transformToRequire: {
                            video: "src",
                            source: "src",
                            img: "src",
                            image: "xlink:href",
                        },
                    },
                },
                {
                    test: /\.jsx?$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/,
                    use: (() => {
                        const styleLoader = styleLoaders.style();
                        const loaders = [
                            styleLoaders.css(1),
                            styleLoaders.sass(),
                        ];

                        if (isDevelopment) {
                            return [styleLoader].concat(loaders);
                        }

                        return ExtractTextPlugin.extract({
                            fallback: styleLoader,
                            use: loaders,
                        });
                    })(),
                },
            ]
        },
        plugins: (() => {
            const plugins = [
                new webpack.DefinePlugin({
                    "process.env.NODE_ENV": isProduction ? "'production'" : "'development'",
                }),
                new webpack.NamedModulesPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
            ];

            if (isDevelopment) {
                plugins.push(
                    new webpack.HotModuleReplacementPlugin(),
                );
            }

            if (isProduction) {
                plugins.push(
                    new ExtractTextPlugin("[name].css"),
                    new webpack.optimize.OccurrenceOrderPlugin(),
                    new webpack.optimize.ModuleConcatenationPlugin(),
                    new UglifyJsPlugin({
                        parallel: true,
                        cache: true,
                        sourceMap: sourceMapsEnabled,
                        uglifyOptions: {
                            ecma: 8,
                            compress: {
                                unsafe: true,
                            },
                        },
                    }),
                );
            }

            plugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, "src/templates/index.html"),
                    inject: true,
                }),
            );

            return plugins;
        })(),
        devtool: sourceMapsEnabled ? (isProduction ? "source-map" : "eval-cheap-module-source-map") : undefined,
        devServer: {
            hot: isDevelopment,
            inline: isDevelopment,
            historyApiFallback: true,
            host: env.HOST ||  "localhost",
            port: env.PORT || 8080,
            overlay: {
                warnings: false,
                errors: true,
            },
            publicPath: "",
        },
    };
};
