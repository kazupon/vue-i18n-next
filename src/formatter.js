import format from './format'

export default class Formatter {
  constructor (locale) {
    this._locale = this.locale
  }

  get locale () { return this._locale }
  set locale (val) { return this._locale = val }

  format (message, ...args) {
    return format(message, ...args)
  }
}
