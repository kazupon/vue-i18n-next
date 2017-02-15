import Vue from 'vue'
import App from './App.vue'
import VueI18n from './i18n'
import CustomFormatter from './customformatter'

Vue.use(VueI18n)

const lang = 'en-US'
const i18n = new VueI18n({
  lang,
  formatter: new CustomFormatter(lang),
  locales: {
    'en-US': {
      message: {
        hello: 'hello!!',
        foo: 'hello {name}',
        plural: 'You have {N, plural, =0{no messages} one{1 message} other{# messages}}.',
        select: '{gender, select, male{He} female{She} other{They}} liked this.',
        number: 'Current Percent: {current, number, percent}',
        time: 'Current Time: {current, time, short}'
      }
    },
    'ja-JP': {
      message: {
        hello: 'こんにちは！！',
        foo: 'こんにちは {name}',
        select: '{gender, select, male{彼} female{彼女} other{彼ら}} はこれを好きです。',
        number: '現在パーセンテージ {current, number, percent}',
        time: '現在時刻: {current, time, medium}',
      }
    }
  }
})

const vm = new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
