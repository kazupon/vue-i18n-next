import Vue from 'vue'
import App from './App.vue'
import VueI18n from './i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locales: {
    en: {
      message: {
        hello: 'hello!!',
        foo: 'hello {0}'
      }
    },
    ja: {
      message: {
        hello: 'こんにちは！！',
        foo: 'こんにちは {0}'
      }
    }
  }
})

const vm = new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
console.log(vm)
