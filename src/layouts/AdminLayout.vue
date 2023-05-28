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
          {{ $t("appTitle") }} Admin
        </q-toolbar-title>

        <div class="row items-center q-gutter-x-xs">
					<q-btn icon="mdi-home" round flat dense to="/"></q-btn>
          <LanguageSelector
            flat
            round
            :icon-options="{ size: '30px' }"
          ></LanguageSelector>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
			<AdminMenu></AdminMenu>
		</q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import LanguageSelector from "components/etc/LanguageSelector.vue";
import AdminMenu from "src/components/admin/AdminMenu.vue";

export default defineComponent({
  name: "MainLayout",
  components: { LanguageSelector, AdminMenu },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
