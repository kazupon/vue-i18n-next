import { isObject } from './util'

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

export let Vue

export function install (_Vue) {
  if (install.installed) { return }
  install.installed = true

  Vue = _Vue

  Vue.mixin({
    computed: {
      $t () {
        const $lang = this.$i18n.lang
        const $locales = this.$i18n.locales
        return (key, ...args) => {
          console.log('counter with $t', key, ...args, $locales)
          if (!key) { return '' }
          let { lang, fallback, params } = parseArgs(...args)
          console.log('parsed', lang, fallback, params)
          if (!lang) {
            lang = $lang
          }
          return this.$i18n.t(key, lang, $locales, fallback, params)
        }
      }
    },

    beforeCreate () {
      const options = this.$options
      console.log('beforeCreate', this)
      if (options.i18n) {
        this.$i18n = options.i18n
      } else if (options.parent && options.parent.$i18n) {
        this.$i18n = options.parent.$i18n
      }
    }
  })
}
