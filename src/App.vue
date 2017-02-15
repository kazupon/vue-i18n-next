<template>
  <div id="app">
    <p>{{ msg }}</p>
    <p>$t: {{ $t('message.hello') }}</p>
    <p>$t(ICU format: plural): {{ $t('message.plural', { N: 4 }) }}</p>
    <p>$t(ICU format: select): {{ $t('message.select', { gender: 'male' }) }}</p>
    <p>$t(ICU format: number): {{ $t('message.number', { current: 0.5 }) }}</p>
    <p>$t(ICU format: time): {{ $t('message.time', { current: new Date() }) }}</p>
    <hello></hello>
  </div>
</template>

<script>
  import Hello from './Hello.vue'
  export default {
    name: 'app',
    components: {
      Hello
    },
    data () {
      return {
        msg: 'Parent'
      }
    }
  }
</script>
