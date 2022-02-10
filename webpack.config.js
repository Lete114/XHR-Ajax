const { join } = require('path')
const port = require('./package.json').port
const request = 'ajax'

module.exports = {
  entry: join(__dirname, './index.js'),
  output: {
    path: join(__dirname, './dist'),
    filename: request + '.js',
    library: request,
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 不编译node_modules下的文件
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    port: port + 1,
    hot: true, // 启用热重载
    compress: true, // 压缩
    open: true,
    client: {
      logging: 'warn'
    },
    static: [
      { directory: join(__dirname, 'test') },
      { directory: join(__dirname, 'public') }
    ]
  }
}
