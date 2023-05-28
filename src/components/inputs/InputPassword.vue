<template>
  <q-input
    v-bind="$attrs"
    :type="formType ? 'password' : 'text'"
    :model-value="modelValue"
    @update:model-value="emitValue"
  >
    <template #append>
      <q-icon
        :name="formType ? 'mdi-eye' : 'mdi-eye-off'"
        class="cursor-pointer"
        @click="formType = !formType"
      ></q-icon>
    </template>
  </q-input>
  <div v-if="showInfo">
    <q-checkbox :model-value="passLen" label="5자이상" tabindex="-1" />
    <q-checkbox :model-value="passNumber" label="숫자를 포함" tabindex="-1"/>
    <q-checkbox :model-value="passAlpha" label="대문자 포함" tabindex="-1"/>
    <q-checkbox :model-value="passSymbol" label="특수문자 포함" tabindex="-1"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import validateRules from "src/util/validateRules";

export default defineComponent({
  name: "InputPassword",
  props: {
    modelValue: { type: String, required: true },
		showInfo : {type :Boolean, defalut: false},
  },
  data() {
    return {
      formType: true,
    };
  },
  computed: {
    rules: () => validateRules,
    passLen() {
      const pattern = /^.*(?=^.{5,}$)/;
      return pattern.test(this.modelValue);
    },
    passNumber() {
      const pattern = /^.*(?=.*\d)/;
      return pattern.test(this.modelValue);
    },
    passAlpha() {
      const pattern = /^.*(?=.*[A-Z])/;
      return pattern.test(this.modelValue);
    },
    passSymbol() {
      const pattern = /^.*(?=.*[!@#$%^&*])/;
      return pattern.test(this.modelValue);
    },
  },
  methods: {
    emitValue(val) {
      this.$emit("update:model-value", val);
    },
  },
});
</script>

<style lang='scss' scoped>
</style>