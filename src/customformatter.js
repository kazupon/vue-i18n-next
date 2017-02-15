import MessageFormat from 'messageformat'
import Formatter from './formatter'

export default class CustomFormatter extends Formatter {
  constructor (locale) {
    super(locale)
    this._formatter = new MessageFormat(locale)
    this._formatter.setIntlSupport(true)
    this._caches = Object.create(null)
  }

  format (message, ...args) {
    let fn = this._caches[message]
    if (!fn) {
      fn = this._formatter.compile(message, this.locale)
      this._caches[message] = fn
    }
    return fn(...args)
  }
}
