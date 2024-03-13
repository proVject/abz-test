<script setup>
import {useInputHelper} from "@/hooks/useInputHelper.js";
import {defineSlots} from "vue";

const props = defineProps({
  errorText: {
    type: String,
    default: '',
    required: false,
  },
  helperText: {
    type: String,
    default: '',
    required: false,
  },
})
const { hasError, hasHelper } = useInputHelper(props)
</script>

<template>
  <div v-if="hasError" class="abz-upload-input__error text-ellipsis">
    {{ errorText }}
  </div>
  <div v-else-if="hasHelper" class="abz-upload-input__helper text-ellipsis">
    {{ helperText }}
  </div>
</template>

<style >
.abz-input{
  position: relative;
  margin-bottom: 50px;
}
.abz-upload-input__helper,
.abz-upload-input__error {
  position: absolute;
  bottom: -22px;
  padding: 4px 16px;
  font-size: 12px;
  line-height: 14px;
}

.abz-upload-input__helper {
  color: var(--gray-color);
}

.abz-upload-input__error {
  color: var(--error-color);
}
</style>