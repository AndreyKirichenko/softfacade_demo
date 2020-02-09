const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'app.css'
      })
    ]
  };
};