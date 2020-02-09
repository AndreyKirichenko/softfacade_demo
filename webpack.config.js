const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const js = require('./webpack/js');
const css = require('./webpack/css');
const favicon = require('./webpack/favicon');
const webworker = require('./webpack/webworker');
const nodeEnv = require('./webpack/node.env');

const pug = require('./webpack/pug');
const sourceMap = require('./webpack/sourceMap');
const devserver = require('./webpack/devserver');
const lintJS = require('./webpack/js.lint');
const lintCSS = require('./webpack/sass.lint');

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

const common = merge([
  {
    entry: './src/index.js',

    devServer: {
      historyApiFallback: true,
    },

    output: {
      path: PATHS.build,
      filename: 'index.js'
    },

    plugins: [
      new HtmlWebpackPlugin({
        // filenamen: './src/index.html',
        template: PATHS.source + '/pug/index.pug',
      }),

      new CopyWebpackPlugin([
        { from: PATHS.source + '/img/', to: 'img/', force: true },
        { from: PATHS.source + '/fonts/', to: 'fonts/', force: true },
        { from: PATHS.source + '/robots.txt', to: '', force: true },
      ], {}),
    ],
  },
  pug(),
  js(),
  css(),
  favicon(),
  webworker(),
]);

module.exports = function(env, argv) {
  console.log(argv.mode);
  if (argv.mode === 'development') {
    return merge([
      common,
      devserver(),
      sourceMap(),
      lintJS({ paths: PATHS.source }),
      lintCSS(),
      nodeEnv(argv.mode),
    ]);
  }

  if (argv.mode === 'production') {
    return merge([
      common,
      nodeEnv(argv.mode),
    ]);
  }
};
