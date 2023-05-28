<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="emitValue"
    :maxlength="maxlength"
  ></q-input>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputPhone",
  props: {
    modelValue: { type: String, required: true },
  },
  data() {
    return {
      maxlength: 13,
    };
  },
  methods: {
    emitValue(val) {
      this.$emit("update:model-value", this.autoMask(val));
    },
		autoMask(val) {
			val = val.replace(/[^\d]/g, "");
			let pattern = /^(\d{2,3})(\d{3,4})(\d{4})$/;
			let result = "$1-$2-$3";
			if(val[0] != '0') { // 0으로 시작하지 않음
				pattern = val.length < 8 ? /^(\d{3})(\d{0,4})/ : /^(\d{4})(\d{0,4})/;
				result = "$1-$2";
				this.maxlength = 9;
			} else if(val[1] == '2') { // 02
				pattern = val.length < 10 ? /^(\d{2})(\d{3})(\d{0,4})/ : /^(\d{2})(\d{4})(\d{0,4})/;
				this.maxlength = 12;
			} else { // 일반 번호
				pattern = val.length < 11 ? /^(\d{3})(\d{3})(\d{0,4})/ : /^(\d{3})(\d{4})(\d{0,4})(\d*)/;
				this.maxlength = 13;
			}
			return val.replace(pattern, result);
		}
  },
});
</script>

<style lang='scss' scoped>
</style>