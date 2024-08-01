const path = require('node:path');
const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [ path.resolve(__dirname, 'dist/index.js') ],
    output: {
      filename: 'comunica-browser.js',
      path: __dirname,
      libraryTarget: 'var',
      library: 'Comunica',
    },
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/u,
          loader: 'babel-loader',
          exclude: /node_modules/u,
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new NodePolyfillPlugin(),
    ],
    performance: {
      hints: 'error',
      maxAssetSize: 1750000,
      maxEntrypointSize: 1750000,
    },
    resolve: {
      fallback: {
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify'),
        'node:stream': require.resolve('stream-browserify'),
        url: require.resolve('url/'),
        "querystring": require.resolve("querystring-es3")
      },
    },
    // externals: [nodeExternals({
    //   allowlist: [/^node:/]
    // })],
    target: 'web'
};
