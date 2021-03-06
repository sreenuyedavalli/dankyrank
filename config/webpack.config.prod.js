'use strict';

const path = require('path');
const webpack = require('webpack');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ManifestPlugin = require('webpack-manifest-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const BundleTracker = require('webpack-bundle-tracker');
const components = require('./components');

const publicPath = '/static/bundles/';
const shouldUseRelativeAssetPaths = publicPath === './';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const publicUrl = publicPath.slice(0, -1);

const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: Object.assign(
                {},
                shouldUseRelativeAssetPaths ? {publicPath: '../../'} : undefined
            ),
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009',
                        },
                        stage: 3,
                    }),
                ],
                sourceMap: shouldUseSourceMap,
            },
        },
    ];
    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
            options: {
                sourceMap: shouldUseSourceMap,
            },
        });
    }
    return loaders;
};

module.exports = {
    mode: 'production',
    bail: true,
    devtool: shouldUseSourceMap ? 'source-map' : false,
    entry: components.components,
    output: {
        path: paths.appBuild,
        filename: 'js/[name].[chunkhash:8].js',
        publicPath: publicPath,
        devtoolModuleFilenameTemplate: info =>
            path
                .relative(paths.appSrc, info.absoluteResourcePath)
                .replace(/\\/g, '/'),
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
                parallel: true,
                cache: true,
                sourceMap: shouldUseSourceMap,
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: shouldUseSourceMap
                        ? {
                            inline: false,
                            annotation: true,
                        }
                        : false,
                },
            }),
        ],
    },
    resolve: {
        plugins: [
            PnpWebpackPlugin,
            new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
        ],
        mainFields: ['main']
    },
    resolveLoader: {
        plugins: [
            PnpWebpackPlugin.moduleLoader(module),
        ],
    },
    module: {
        strictExportPresence: true,
        rules: [
            {parser: {requireEnsure: false}},
            {
                test: /\.(js|mjs|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint'),

                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                include: paths.appSrc,
            },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'media/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        test: /\.(js|mjs|jsx)$/,
                        include: paths.appSrc,

                        loader: require.resolve('babel-loader'),
                        options: {
                            customize: require.resolve(
                                'babel-preset-react-app/webpack-overrides'
                            ),

                            plugins: [
                                [
                                    require.resolve('babel-plugin-named-asset-import'),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                                            },
                                        },
                                    },
                                ],
                            ],
                            cacheDirectory: true,
                            cacheCompression: true,
                            compact: true,
                        },
                    },
                    {
                        test: /\.(js|mjs)$/,
                        exclude: /@babel(?:\/|\\{1,2})runtime/,
                        loader: require.resolve('babel-loader'),
                        options: {
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            presets: [
                                [
                                    require.resolve('babel-preset-react-app/dependencies'),
                                    {helpers: true},
                                ],
                            ],
                            cacheDirectory: true,
                            cacheCompression: true,
                            sourceMaps: false,
                        },
                    },
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        loader: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: shouldUseSourceMap,
                        }),
                        sideEffects: true,
                    },
                    {
                        test: cssModuleRegex,
                        loader: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: shouldUseSourceMap,
                            modules: true,
                            getLocalIdent: getCSSModuleLocalIdent,
                        }),
                    },
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        loader: getStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: shouldUseSourceMap,
                            },
                            'sass-loader'
                        ),
                        sideEffects: true,
                    },
                    {
                        test: sassModuleRegex,
                        loader: getStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: shouldUseSourceMap,
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent,
                            },
                            'sass-loader'
                        ),
                    },
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(js|mjs|jsx)$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ModuleNotFoundPlugin(paths.appPath),
        new webpack.DefinePlugin(env.stringified),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].chunk.css',
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: publicPath,
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new BundleTracker({path: '.', filename: 'webpack-stats.prod.json'}),
    ].filter(Boolean),

    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    performance: false,
};
