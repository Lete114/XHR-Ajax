<div align="right">
  语言:
  中文
  <a title="English" href="/README_EN.md">English</a>
</div>

<h1 align="center"><a href="https://github.com/lete114/XHR-Ajax" target="_blank">XHR-Ajax</a></h1>
<p align="center">一个简单的浏览器 XMLHttpRequest 请求模块</p>

<p align="center">
    <a href="https://github.com/Lete114/XHR-Ajax/releases/"><img src="https://img.shields.io/npm/v/xhr-ajax" alt="Version"></a>
    <a href="https://github.com/Lete114/XHR-Ajax/tree/main"><img src="https://img.shields.io/github/package-json/v/Lete114/XHR-Ajax/main?color=%231ab1ad&label=main" alt="dev"></a>
    <a href="https://github.com/Lete114/XHR-Ajax/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Lete114/XHR-Ajax?color=FF5531" alt="MIT License"></a>
</p>

## 安装

Using npm:

```bash
npm install xhr-ajax --save
```

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/xhr-ajax/dist/ajax.js"></script>
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/xhr-ajax/dist/ajax.js"></script>
```

## 使用案例

### Node.js

```js
const ajax = require('xhr-ajax')
const url = 'https://example.com'
// 你可以使用这些语法
ajax(url)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

// 完整的参数
ajax({
  url,
  method: 'post', // 默认为: GET
  timeout: 5000,
  headers: { token: 'token string' }, // 可以设置多个请求头
  data: { name: 'xhr-ajax', year: 2022 } // 请求数据
})
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
```

### 浏览器

```html
<script src="https://cdn.jsdelivr.net/npm/xhr-ajax/dist/ajax.js"></script>
<script>
  const url = 'https://example.com'
  // 你可以使用这些语法
  ajax(url)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

  // 完整的参数
  ajax({
    url,
    method: 'post', // 默认为: GET
    timeout: 5000,
    headers: { token: 'token string' }, // 可以设置多个请求头
    data: { name: 'xhr-ajax', year: 2022 } // 请求数据
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
</script>
```

## 开发

将存储库克隆到本地计算机

```bash
npm install # 安装依赖
npm run server # 启动一个本地后台测试服务器
npm run test # 启动一个前端测试服务器
npm run lint # 你在提交之前，需要对代码进行语法检查
```

## 许可证

[MIT](LICENSE)
