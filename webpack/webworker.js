module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' }
        }
      ],
    },
    output: {
      globalObject: 'this'
    }
  };
};
