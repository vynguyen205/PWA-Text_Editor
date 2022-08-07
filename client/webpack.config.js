const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { dirname } = require('path');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    // there are a few modes for webpack to run in: production, development, and none.
    mode: 'development',
    // entry is the starting point for our application.
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // output is the file that is generated after webpack has finished bundling our code.
    output: {
      filename: '[name].bundle.js',
      // path is the absolute path to the folder we want to output our bundle to.
      path: path.resolve(__dirname, 'dist'),
    },
    // 
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
      }),
      new WebpackPwaManifest({
        name: 'JATE',
        orientation: 'portrait',
        display: 'standalone',
        start_url: '/',
        short_name: 'JATE',
        description: 'JATE is a web application for managing your time.',
        background_color: '#0000ff',
        theme_color: '#0000ff',

        icons: [{
          src: path.resolve(__dirname, './src/images/logo.png'),
          sizes: [192,512],
          // destination: path.join('assets', 'icons'),
        }]
        
      }),
      new MiniCssExtractPlugin({}),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      })
    ],
    // module is the configuration for our loaders.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [ MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: { 
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
           }
          }
        }
      ],
    },
  };
};
