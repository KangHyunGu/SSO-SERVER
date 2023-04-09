<template>
  <q-page class="flex flex-center padding">
    <q-card style="width:100%; max-width:600px;">
      <q-card-section class="bg-primary text-white text-h6">
        {{ $t('loginTitle') }}
        </q-card-section>
        <q-tabs v-model="tab" active-color="primary" class="text-gery" align="justify">
          <q-tab
            v-for="item in tabItems"
            :key="item.name"
            :name="item.name"
            :label="item.label"
          >
          </q-tab>
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <login-form></login-form>
          </q-tab-panel>
          <q-tab-panel name="id">
            <find-id-form></find-id-form>
          </q-tab-panel>
          <q-tab-panel name="pw">
            <find-pw-form></find-pw-form>
          </q-tab-panel>
        </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import LoginForm from 'src/components/auth/LoginForm.vue';
import FindIdForm from 'src/components/auth/FindIdForm.vue';
import FindPwForm from 'src/components/auth/FindPwForm.vue';
import { defineComponent } from 'vue'


export default defineComponent({
  components : {LoginForm, FindIdForm, FindPwForm},
  name: 'LoginPage',
  data() {
    return {
      tab : "login",
    }
  },

  computed : {
    tabItems() {
      // data 영역에 넣을 경우 초기에 감지가 되지 않아 computed로 구현
      return [
        {label : this.$t('loginTab1'), name: 'login'},
        {label : this.$t('loginTab2'), name: 'id'},
        {label : this.$t('loginTab3'), name: 'pw'},
      ]
    },
  },
  mounted() {
    this.tab = this.$route.hash ? this.$route.hash.substring(1) : 'login';
    console.log(this.$route);
  }
});
</script>

<style lang='scss' scoped>
</style>
