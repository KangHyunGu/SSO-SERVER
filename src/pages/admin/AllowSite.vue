<template>
  <q-page padding>
    <div>
      <q-btn label="test" @click="test"></q-btn>
    </div>
    <q-table
      v-model:pagination="pagination"
      :columns="columns"
      :rows="rows"
      row-key="id"
      @request="fetchData"
      >
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import allowSiteApi from 'src/apis/allowSiteApi'
import TablePageMixin from 'src/mixins/TablePageMixin.vue';

export default defineComponent({
  name: 'AllowSite',
  mixins:[TablePageMixin],
  data() {
    return {
      pagination: null,
      rows: [],
    };
  },
  computed : {
    columns() {
      const arr = [...allowSiteApi.columns];
      arr.push({name: "CMD"});
      return arr;
    },
    defaultPagination: ()=> allowSiteApi.defaultPagination,
    fetchApi: () => allowSiteApi.list,
  },

  methods : {
    async test() {
      const data = await allowSiteApi.test();
      console.log('data : ', data);
    }
  }
});
</script>

<style lang='scss' scoped>
</style>
