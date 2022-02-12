const GET = 'GET'
const e = encodeURIComponent

function defaultObject() {
  return {
    method: GET,
    async: true,
    data: {},
    headers: {}
  }
}

function setHeader(xhr, obj) {
  for (const key in obj.headers) xhr.setRequestHeader(key, obj.headers[key])
}

function param(obj) {
  const data = obj.data
  const isGet = obj.method === GET
  const isData = Object.keys(data).length
  if (isData && isGet) {
    const arr = []
    for (const i in data) {
      const isHasOwnProperty = Object.prototype.hasOwnProperty.call(data, i)
      if (isHasOwnProperty) {
        arr.push(e(i) + '=' + e(data[i]))
      }
    }
    obj.url += /\?$/.test(obj.url) ? '' : '?'
    obj.url += arr.join('&')
  }
}

function methods(xhr, obj) {
  param(obj)
  xhr.open(obj.method, obj.url, obj.async, obj.username, obj.password)
  setHeader(xhr, obj)
  switch (obj.method) {
    case GET:
      xhr.send()
      break
    case 'POST':
      xhr.send(JSON.stringify(obj.data))
      break
  }
}

function Response(xhr, obj) {
  try {
    const type =
      obj.responseType || xhr.getResponseHeader('Content-Type')?.split(';')[0]

    const text = xhr.responseText
    const xml = xhr.responseXML

    if (type && (text || xml)) {
      switch (decodeURIComponent(type)) {
        case 'text/xml':
        case 'xml':
          return xml
        case 'text/json':
        case 'application/json':
        case 'text/javascript':
        case 'application/javascript':
        case 'application/x-javascript':
        case 'json':
          return JSON.parse(text)
      }
    }
    return text
  } catch (e) {
    return xhr
  }
}

/**
 *
 * 封装ajax请求
 * @param {Object} obj 请求参数
 * @returns {Promise}
 */
function ajax(object) {
  if (!object) return object
  return new Promise((resolve, reject) => {
    if ('object' !== typeof object) object = { url: object }
    const xhr = new XMLHttpRequest()
    const obj = Object.assign(defaultObject(), object)
    obj.method = obj.method.toUpperCase()
    methods(xhr, obj) // 请求方法

    // 超时
    let timer
    if (obj.timeout) timer = setTimeout(() => xhr.abort(), obj.timeout)

    xhr.onreadystatechange = () => {
      try {
        if (xhr.readyState === 4) {
          if (timer) clearTimeout(timer) // 清理超时(不执行xhr.abort())

          const isSuccess = xhr.status >= 200 && xhr.status < 300
          if (isSuccess) resolve(Response(xhr, obj))
          else reject(xhr)
        }
      } catch (error) {
        reject(error)
      }
    }
  })
}

module.exports = ajax
