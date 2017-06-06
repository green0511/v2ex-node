export class Cookie {
  private data: any = {}

  set(name, value) {
    console.log('cookie.set')
    console.log(name)
    console.log(value)
    this.data[name] = value
    console.log(this.data)
    console.log('cookie.set end')
  }

  get() {
    return this.data
  }
}

export const cookie = new Cookie()