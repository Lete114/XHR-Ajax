mocha.setup('bdd')
const assert = chai.assert

const host = '127.0.0.1'
const port = 6870
const url = `http://${host}:${port}`

const json = 'application/json'

describe('Error Handling', () => {
  it('Request rarams is undefined', async () => {
    const data = await ajax()
    const is = data === undefined
    assert.ok(is)
  })

  it('Request rarams is null', async () => {
    const data = await ajax(null)
    const is = data === null
    assert.ok(is)
  })

  it('Request rarams are not object', async () => {
    await ajax(123).catch((xhr) => {
      assert.ok(xhr.status === 404)
    })
  })
})

describe('Request tests', () => {
  it('Set request header', async () => {
    const token = 'Test token'
    const lang = 'Test lang'
    const data = await ajax({
      url,
      headers: { token, lang },
      data: { type: json }
    })
    const isToken = token === data.token
    const isLang = lang === data.lang
    const condition = isToken && isLang
    assert.ok(condition)
  })

  it('Request timeout', async () => {
    await ajax({
      url,
      timeout: 500,
      data: {
        timeout: true
      }
    }).catch((xhr) => {
      const is = xhr.status === 0
      assert.ok(is)
    })
  })

  it('Not request parameters and only one request address', async () => {
    const data = await ajax(url)
    assert.strictEqual(JSON.stringify(data), '{}')
  })
})

describe('Get request (Default)', () => {
  it('With request params', async () => {
    const data = await ajax({
      url,
      data: { type: json, name: 'Lete', age: 18 }
    })
    const name = 'Lete' === data.name
    const age = '18' === data.age
    const condition = name && age
    assert.ok(condition)
  })

  it('Chinese string params (decoded)', async () => {
    const data = await ajax({
      url,
      data: { type: json, name: '乐特', age: 18 }
    })
    const name = '乐特' === data.name
    const age = '18' === data.age
    const condition = name && age
    assert.ok(condition)
  })

  it('Only key without value', async () => {
    const data = await ajax(url + '?name=&age=')
    const condition = JSON.stringify(data) === '{"name":"","age":""}'
    assert.ok(condition)
  })
})

describe('Post request', () => {
  it('Not request params', async () => {
    const data = await ajax({ url, method: 'post' })
    const condition = JSON.stringify(data) === '{}'
    assert.ok(condition)
  })

  it('With request params', async () => {
    const data = await ajax({
      url,
      method: 'post',
      data: { type: json, name: 'Lete', age: 18 }
    })
    const name = 'Lete' === data.name
    const age = 18 === data.age
    const condition = name && age
    assert.ok(condition)
  })
})

mocha.run()
