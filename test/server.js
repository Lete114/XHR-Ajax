const http = require('http')
const bodyData = require('body-data')
const port = require('../package.json').port

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'token,lang')
  let data = await bodyData(req)

  // 返回请求头，用于测试
  if (req.headers.token) {
    data.token = req.headers.token
    data.lang = req.headers.lang
  }

  // 设置返回类型，用于测试
  if (data.type) res.setHeader('content-type', data.type)

  console.log('Request:', data)

  // 设置超时响应返回，用于测试
  if (!data.timeout) return res.end(JSON.stringify(data))

  setTimeout(() => res.end(JSON.stringify(data)), 1000)
})

server.listen(port, () => {
  console.log('Service is up and running port: ' + port)
})
