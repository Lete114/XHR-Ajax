const { join } = require('path')
const port = require('./package.json').port
const request = 'ajax'

module.exports = {
  entry: join(__dirname, './index.js'),
  output: {
    path: join(__dirname, './dist'),
    filename: request + '.js',
    library: request,
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  devServer: {
    port: port + 1,
    hot: true, // 启用热重载
    compress: true, // 压缩
    // open: true,
    client: {
      logging: 'warn'
    },
    static: [
      { directory: join(__dirname, 'test') },
      { directory: join(__dirname, 'public') }
    ]
  }
}
