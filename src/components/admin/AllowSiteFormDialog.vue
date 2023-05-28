<template>
  <MyDialog
    ref="dialog"
    label="허용 사이트"
    :card-props="{ style: { width: '400px' } }"
    persistent
  >
    <q-form @submit="save">
      <q-card-section>
        <q-input label="App Name" v-model="form.appName"></q-input>
        <q-input label="Domain" v-model="form.siteUrl"></q-input>
        <q-select
          label="Allow"
          v-model="form.allowed"
          :options="allowOptions"
        ></q-select>
      </q-card-section>
      <q-card-actions>
        <q-btn
          type="submit"
          :label="item ? '수정' : '등록'"
          class="full-width"
          color="primary"
        ></q-btn>
      </q-card-actions>
    </q-form>
  </MyDialog>
</template>

<script>
import { defineComponent } from "vue";
import MyDialog from "../etc/MyDialog.vue";
import allowSiteApi from "src/apis/allowSiteApi";

export default defineComponent({
  components: { MyDialog },
  name: "AllowSiteFormDialog",
  emits: ["saved"],
  props: {
    item: { type: [Object, null], default: null },
  },
  data() {
    return {
      form: {
        appName: "",
        siteUrl: "",
        allowed: "",
      },
      allowOptions: ["Y", "N"],
    };
  },
  methods: {
    show() {
      if (this.item) {
        this.form = {
          appName: this.item.appName,
          siteUrl: this.item.siteUrl,
          allowed: this.item.allowed,
        };
      } else {
        this.form = {
          appName: "",
          siteUrl: "",
          allowed: "Y",
        };
      }
      this.$refs.dialog.show();
    },
    async save() {
      let data;
      this.$q.loading.show();
      if (this.item) {
        data = await allowSiteApi.update(this.item.id, this.form);
      } else {
        data = await allowSiteApi.insert(this.form);
      }
      this.$q.loading.hide();
      if (data) {
        this.$refs.dialog.hide();
        this.$emit("saved");
      }
    },
  },
});
</script>

<style lang='scss' scoped>
</style>