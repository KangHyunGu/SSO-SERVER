<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
        icon="mdi-menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="font-doyeon">
         {{ $t('appTitle') }}
        </q-toolbar-title>

        <div class="row items-center q-qutter-x-xs">
          <login-btn>로그인</login-btn>
          <q-btn :to="{name : 'AdmHome'}" label="Admin"></q-btn>
          <Languae-seletor flat round :icon-options="{size:'30px'}"></Languae-seletor>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item clickable exact to="/join">
          <q-item-section>회원가입</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

import LanguaeSeletor from 'src/components/etc/LanguaeSeletor.vue'
import LoginBtn from 'src/components/auth/LoginBtn.vue'
export default defineComponent({
  name: 'MainLayout',

  components: {LanguaeSeletor, LoginBtn},

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
