const webpack = require('webpack');

module.exports = function(node_env) {
  return {
    plugins: [
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(node_env),
      })
    ]
  };
};