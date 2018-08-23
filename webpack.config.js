let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let conf = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js',
    publicPath: 'dist/'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.pug/,

        use: [
          'pug-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
    new HtmlWebpackPlugin({
      template : './src/pug/index.pug',
      filename: '../index.html'
    })
  ],
};

module.exports = (env, options) => {
  let production = options.mode === 'production';
  conf.devtool = production ? false : 'eval-sourcemap';
  return conf;
};
