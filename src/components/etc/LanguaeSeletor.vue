<template>
  <q-btn>
    <q-badge v-bind="badgeOptions">{{ selected }}</q-badge>
    <AkarLanguageIcon v-bind="iconOptions"></AkarLanguageIcon>
    <q-menu>
      <q-list>
        <q-item
              v-for="opt in localeOptions"
              :key="opt.value"
              clickable
              v-close-popup
              @click="changeLocale(opt.value)">
          <q-item-section> {{ opt.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>

      <!-- <q-select
    :model-value="locale"
    :options="localeOptions"
    label="Quasar Language"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
    @update:model-value="changeLocale"
  /> -->

</template>

<script>
import { defineComponent } from 'vue'
import AkarLanguageIcon from '../icons/AkarLanguageIcon.vue'

export default defineComponent({
  components: {AkarLanguageIcon},
  name: 'LanguaeSeletor',
  props : {
    badgeOptions : {
      type:Object,
      default: () => ({color: 'orange', floating: true})
    },
    iconOptions : {
      type: Object,
      default: () => ({size : "md"}),
    }
  },
  data() {
    return {
      locale : 'ko-KR',
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'ko-KR', label: 'Korean' }
      ]
    }
  },
  computed: {
    selected() {
      switch(this.locale){
        case 'en-US' :return 'A';
        case 'ko-KR' :return '가';
      }
    }
  },
  watch: {
    locale() {
      this.$i18n.locale = this.locale;
    }
  },
  mounted() {
    // locale 값을 로컬 스토리지에서 가져올 것
    this.locale = this.$q.localStorage.getItem('locale') || 'ko-KR';
    this.$i18n.locale = this.locale

  },
  methods: {
    changeLocale(value) {
      this.locale = value;
      // locale 값을 로컬 스토리지에 저장
      this.$q.localStorage.set('locale', value);
    }
  }
});
</script>

<style lang='scss' scoped>
</style>
