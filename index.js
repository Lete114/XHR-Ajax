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

function isJSON(t) {
  try {
    return JSON.parse(t)
  } catch (error) {
    return t
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
          if (isSuccess) resolve(isJSON(xhr.responseText))
          else reject(xhr)
        }
      } catch (error) {
        reject(error)
      }
    }
  })
}

export default ajax
