'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

var GET = 'GET';
var e = encodeURIComponent;

function defaultObject() {
  return {
    method: GET,
    async: true,
    data: {},
    headers: {}
  };
}

function isJSON(t) {
  try {
    return JSON.parse(t);
  } catch (error) {
    return t;
  }
}

function setHeader(xhr, obj) {
  for (var key in obj.headers) {
    xhr.setRequestHeader(key, obj.headers[key]);
  }
}

function param(obj) {
  var data = obj.data;
  var isGet = obj.method === GET;
  var isData = Object.keys(data).length;

  if (isData && isGet) {
    var arr = [];

    for (var i in data) {
      var isHasOwnProperty = Object.prototype.hasOwnProperty.call(data, i);

      if (isHasOwnProperty) {
        arr.push(e(i) + '=' + e(data[i]));
      }
    }

    obj.url += /\?$/.test(obj.url) ? '' : '?';
    obj.url += arr.join('&');
  }
}

function methods(xhr, obj) {
  param(obj);
  xhr.open(obj.method, obj.url, obj.async, obj.username, obj.password);
  setHeader(xhr, obj);

  switch (obj.method) {
    case GET:
      xhr.send();
      break;

    case 'POST':
      xhr.send(JSON.stringify(obj.data));
      break;
  }
}
/**
 *
 * 封装ajax请求
 * @param {Object} obj 请求参数
 * @returns {Promise}
 */


function ajax(object) {
  if (!object) return object;
  return new Promise(function (resolve, reject) {
    if ('object' !== _typeof(object)) object = {
      url: object
    };
    var xhr = new XMLHttpRequest();
    var obj = Object.assign(defaultObject(), object);
    obj.method = obj.method.toUpperCase();
    methods(xhr, obj); // 请求方法
    // 超时

    var timer;
    if (obj.timeout) timer = setTimeout(function () {
      return xhr.abort();
    }, obj.timeout);

    xhr.onreadystatechange = function () {
      try {
        if (xhr.readyState === 4) {
          if (timer) clearTimeout(timer); // 清理超时(不执行xhr.abort())

          var isSuccess = xhr.status >= 200 && xhr.status < 300;
          if (isSuccess) resolve(isJSON(xhr.responseText));else reject(xhr);
        }
      } catch (error) {
        reject(error);
      }
    };
  });
}

module.exports = ajax;
