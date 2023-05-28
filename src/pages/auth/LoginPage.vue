<template>
  <q-page class="flex flex-center" padding>
    <q-card style="width: 100%; max-width: 600px">
      <q-card-section class="bg-primary text-white text-h6">
        {{ $t("loginTitle") }}
      </q-card-section>
      <q-tabs
        v-model="tab"
        active-color="primary"
        class="text-gery"
        align="justify"
      >
        <q-tab
          v-for="item in tabItems"
          :key="item.name"
          :name="item.name"
          :label="item.label"
        ></q-tab>
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <LoginForm></LoginForm>
        </q-tab-panel>
        <q-tab-panel name="id">
          <FindIdForm></FindIdForm>
        </q-tab-panel>
        <q-tab-panel name="pw">
          <FindPwForm></FindPwForm>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import LoginForm from "components/auth/LoginForm.vue";
import FindIdForm from "src/components/auth/FindIdForm.vue";
import FindPwForm from "src/components/auth/FindPwForm.vue";

export default defineComponent({
  components: { LoginForm, FindIdForm, FindPwForm },
  name: "LoginPage",
  data() {
    return {
      tab: "login",
    };
  },
  computed: {
    tabItems() {
      return [
        { label: this.$t("loginTab1"), name: "login" },
        { label: this.$t("loginTab2"), name: "id" },
        { label: this.$t("loginTab3"), name: "pw" },
      ];
    },
  },
  mounted() {
    this.tab = this.$route.hash ? this.$route.hash.substring(1) : "login";
  },
});
</script>

<style lang='scss' scoped>
</style>
