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
          <q-btn icon="mdi-home" round flat dense to="/">  </q-btn>
          <Languae-seletor flat round :icon-options="{size:'30px'}"></Languae-seletor>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <admin-menu></admin-menu>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import AdminMenu from 'src/components/admin/AdminMenu.vue'
import LanguaeSeletor from 'src/components/etc/LanguaeSeletor.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {LanguaeSeletor, AdminMenu},

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
