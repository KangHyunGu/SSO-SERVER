<template>
  <q-btn to="/login">
    <slot></slot>
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginBtn',
  data() {
    return {}
  },
});
</script>

<style lang='scss' scoped>
</style>
