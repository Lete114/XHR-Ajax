<div align="right">
  Language:
  English
  <a title="中文" href="/README.md">中文</a>
</div>

<h1 align="center"><a href="https://github.com/lete114/XHR-Ajax" target="_blank">XHR-Ajax</a></h1>
<p align="center">A simple browser XMLHttpRequest request module</p>

<p align="center">
    <a href="https://github.com/Lete114/XHR-Ajax/releases/"><img src="https://img.shields.io/npm/v/xhr-ajax" alt="Version"></a>
    <a href="https://github.com/Lete114/XHR-Ajax/tree/main"><img src="https://img.shields.io/github/package-json/v/Lete114/XHR-Ajax/main?color=%231ab1ad&label=main" alt="dev"></a>
    <a href="https://github.com/Lete114/XHR-Ajax/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Lete114/XHR-Ajax?color=FF5531" alt="MIT License"></a>
</p>

## Installing

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

## Example Usage

### Node.js

```js
const ajax = require('xhr-ajax')
const url = 'https://example.com'
// You can have these syntaxes
ajax(url)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

// Complete
ajax({
  url,
  method: 'post', // Default method: GET
  timeout: 5000,
  headers: { token: 'token string' }, // Multiple request headers can be set
  data: { name: 'xhr-ajax', year: 2022 } // Request data
})
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
```

### Browser

```html
<script src="https://cdn.jsdelivr.net/npm/xhr-ajax/dist/ajax.js"></script>
<script>
  const url = 'https://example.com'
  // You can have these syntaxes
  ajax(url)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

  // Complete
  ajax({
    url,
    method: 'post', // Default method: GET
    timeout: 5000,
    headers: { token: 'token string' }, // Multiple request headers can be set
    data: { name: 'xhr-ajax', year: 2022 } // Request data
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
</script>
```

## Development

Cloning the repository to the local computer

```bash
npm install # Installing Dependencies
npm run server # Start a local backend test server
npm run test # Start a local front-end test server
npm run lint # You need to syntax check your code before submitting it
```

## License

[MIT](LICENSE)
