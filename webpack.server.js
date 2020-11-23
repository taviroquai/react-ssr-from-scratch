require('dotenv').config()
const path = require('path');
 
const config = {
  entry: './src/views/RootMount.js',
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'RootMount.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    noInfo: true,
    port: 3003,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    },
    before: function(app, server, compiler) {
      app.get('/', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'public', 'index-dev.html'));
      });
    }
  }
};
 
module.exports = config;