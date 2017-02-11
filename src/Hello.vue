<template>
  <div>
    <p>{{ msg }}</p>
    <p>$t: {{ $t('message.foo', ['bar']) }}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Child'
      }
    }
  }
</script>
