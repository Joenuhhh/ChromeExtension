const path = require('path');

module.exports = {
  entry: './Script/Graph.js', // Replace with the path to your main JavaScript file
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, // this regex looks for .js or .mjs files
        exclude: /(node_modules|bower_components)/, // it's important to exclude node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};