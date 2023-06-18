<template>
  <q-btn @click="signOut" :loading="loding"><slot></slot></q-btn>
</template>

<script>
import { mapActions } from 'pinia';
import useUser from 'src/stores/useUser';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LogoutBtn',
  data() {
    return {
      logding: false,
    }
  },
  methods : {
    ...mapActions(useUser, ['logout']),
    async signOut() {
      this.loading = true;
      const data = await this.logout();
      this.logding = false;
      if(data) {
        this.$router.push({name:'home'});
      }
    }
  }

});
</script>

<style lang='scss' scoped>
</style>
