<template>
  <q-list separator>
    <q-item v-for="item in items" :key="item.title" :to="item.to" exact>
      <q-item-section avatar>
        <q-icon :name="item.icon"></q-icon>
      </q-item-section>
      <q-item-section>{{ item.title }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdminMenu",
  data() {
    return {};
  },
  computed: {
    items() {
      return [
        {
          title: this.$t("adm_menu_home"),
          icon: "mdi-home-lock",
          to: { name: "AdmHome" },
        },
        {
          title: this.$t("adm_menu_allow"),
          icon: "mdi-web-check",
          to: { name: "AdmAllow" },
        },
      ];
    },
  },
});
</script>

<style lang='scss' scoped>
</style>