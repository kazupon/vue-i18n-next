<template>
  <div id="app">
    <p>{{ msg }}</p>
    <p>$t: {{ $t('message.hello') }}</p>
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
