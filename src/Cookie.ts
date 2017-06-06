export class Cookie {
  private data: any = {}

  set(name, value) {
    this.data[name] = value || ''
  }

  get() {
    return this.data
  }

  clear() {
    this.data = {}
  }

  stringify() {
    return Object.keys(this.data).map(key => `${key}=${this.data[key]}`).join('; ')
  }
}

export const cookie = new Cookie()