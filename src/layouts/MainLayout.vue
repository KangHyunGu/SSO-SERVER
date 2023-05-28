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
          {{ $t("appTitle") }}
        </q-toolbar-title>

        <div class="row items-center q-gutter-x-xs">
          <LoginBtn>로그인</LoginBtn>
          <q-btn :to="{ name: 'AdmHome' }" label="Admin"></q-btn>
          <LanguageSelector
            flat
            round
            :icon-options="{ size: '30px' }"
          ></LanguageSelector>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item clickable exact :to="{ name: 'join' }">
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
import { defineComponent, ref } from "vue";
import LanguageSelector from "components/etc/LanguageSelector.vue";
import LoginBtn from "components/auth/LoginBtn.vue";

export default defineComponent({
  name: "MainLayout",
  components: { LanguageSelector, LoginBtn },
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
