import { install, Vue } from './install'
import { getValue } from './path'
import { isNil, warn, isObject, bind } from './util'
import format from './format'

function parseArgs (...args) {
  let lang = null
  let fallback = null
  if (args.length === 1) {
    if (isObject(args[0]) || Array.isArray(args[0])) {
      args = args[0]
    } else if (typeof args[0] === 'string') {
      lang = args[0]
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      lang = args[0]
    }
    if (isObject(args[1]) || Array.isArray(args[1])) {
      args = args[1]
    }
  }

  return { lang, fallback, params: args }
}

function getComponentLocale (lang) {
  return this.$options.locales[lang]
}

function getGlobalLocale (lang) {
  return this.locales[lang]
}

export default class VueI18n {
  constructor (options) {
    console.log('VueI18n.constructor', options)
    this.vm = null
    const lang = this._lang = options.lang || 'en'
    const locales = this._locales = options.locales || {}
    this.missingHandler = options.missingHandler || null
    this.resetVM({ lang, locales })
  }

  resetVM (data) {
    const oldVM = this._vm
    const silent = Vue.config.silent
    Vue.config.silent = true
    this._vm = new Vue({ data })
    Vue.config.silent = silent
    if (oldVM) {
      Vue.nextTick(() => oldVM.$destroy())
    }
    console.log('VueI18n#resetVM', this._vm)
  }

  get locales () {
    return this._vm.$data.locales
  }

  get lang () {
    return this._vm.$data.lang
  }

  translate (locales, lang, fallback, key, params) {
    let res = null
    res = this.interpolate(locales[lang], key, params)
    if (!isNil(res)) { return res }

    res = this.interpolate(locales[fallback], key, params)
    if (!isNil(res)) {
      if (process.env.NODE_ENV !== 'production') {
        warn('Fall back to translate the keypath "' + key + '" with "'
          + fallback + '" language.')
      }
      return res
    } else {
      return null
    }
  }

  warnDefault (lang, key, vm, result) {
    if (!isNil(result)) { return result }
    if (this.missingHandler) {
      this.missingHandler.apply(null, [lang, key, vm])
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn('Cannot translate the value of keypath "' + key + '". '
          + 'Use the value of keypath as default')
      }
    }
    return key
  }

  interpolate (locale, key, args) {
    if (!locale) { return null }

    let val = getValue(locale, key)
    if (Array.isArray(val)) { return val }
    if (isNil(val)) { val = locale[key] }
    if (isNil(val)) { return null }
    if (typeof val !== 'string') { warn("Value of key '" + key + "' is not a string!"); return null }

    // Check for the existance of links within the translated string
    if (val.indexOf('@:') >= 0) {
      // Match all the links within the local
      // We are going to replace each of
      // them with its translation
      const matches = val.match(/(@:[\w|.]+)/g)
      for (const idx in matches) {
        const link = matches[idx]
        // Remove the leading @:
        const linkPlaceholder = link.substr(2)
        // Translate the link
        const translatedstring = this.interpolate(locale, linkPlaceholder, args)
        // Replace the link with the translated string
        val = val.replace(link, translatedstring)
      }
    }

    return !args ? val : this.format(val, args)
  }

  format (val, ...args) {
    console.log('VueI18n#format', val, ...args)
    return format(val, ...args)
  }

  t (key, lang, locales, fallback, args) {
    console.log('VueI18n#t', key, lang, locales, fallback, args)
    return this.warnDefault(lang, key, this._vm, this.translate(locales, lang, fallback, key, args))
  }
}

VueI18n.install = install
VueI18n.version = '__VERSION__'

if (typeof window && window.Vue) {
  window.Vue.use(VueI18n)
}
