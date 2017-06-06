import { cookie } from '../src/Cookie'
import { expect } from 'chai'

describe('测试 cookie 类', () => {
  
  it('测试写入', () => {
    cookie.set('key-1', 'value-1')
    cookie.set('key-2', 'value-2')
    let data = cookie['data']
    expect(data['key-1']).to.be.equals('value-1')
    expect(data['key-2']).to.be.equals('value-2')
  })

  it('测试读取', () => {
    let data = cookie.get()
    expect(data['key-1']).to.be.equals('value-1')
    expect(data['key-2']).to.be.equals('value-2')
  })

  it('测试字符串', () => {
    expect(cookie.stringify()).equals('key-1=value-1; key-2=value-2')
  })

  after(() => {
    cookie.clear()
  })
})