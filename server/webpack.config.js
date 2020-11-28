module.exports = {
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  resolve: {
    fallback: {
      "zlib": false,
      "querystring": false,
      "path": false,
      "buffer": false,
      "crypto": false,
      "stream": false,
      "http": false,
      "url": false,
      "fs": false,
      "net": false,
      "util": false
    }
  }
}