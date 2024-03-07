const path = require('path');

module.exports = {
  entry: './Script/Graph.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/, // simplified this line
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'], // this tells Webpack to automatically resolve .js files
    modules: ['node_modules', path.resolve(__dirname)], // node_modules should be included by default
  },
};
