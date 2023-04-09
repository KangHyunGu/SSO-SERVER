<template>
  <q-form @submit="onSubmit">
    <q-item-section class="q-gutter-y-md">
      <q-input label="아이디" v-model="form.id"></q-input>
      <q-input label="비밀번호" v-model="form.password" type="password"></q-input>
      <q-btn
        type="submit"
        label="로그인"
        color="primary">
      </q-btn>
      <q-btn
        label="회원가입"
        color="secondary"
        class="full-width">
      </q-btn>
    </q-item-section>
  </q-form>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginForm',
  data() {
    return {
      form: {
        id : '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    }
  }
});
</script>

<style lang='scss' scoped>
</style>
