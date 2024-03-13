<script setup>
import AbzInputHelper from "@/components/ui/Inputs/InputHelper.vue";
import AbzFieldset from "@/components/ui/Inputs/Fieldset.vue";
import {defineProps, defineEmits} from "vue";
import {useInputHelper} from "@/hooks/useInputHelper.js";

const props = defineProps({
  type: {
    default: 'normal',
    type: String,
    required: false,
    validator(value) {
      const availableComponentTypes = ['normal']
      return availableComponentTypes.includes(value)
    }
  },
  inputType: {
    default: 'text',
    type: String,
    required: false,
    validator(value) {
      const availableInputTypes = ['text', 'email', 'password', 'tel', 'url', 'search']
      return availableInputTypes.includes(value)
    }
  },
  text: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
    required: false
  },
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
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits(['update:text'])
const {hasError} = useInputHelper(props)
const onUploadFile = (e) => {
  emit('update:text', e.target.value)
}

</script>

<template>
  <abz-fieldset
      :input-value="text"
      :placeholder="placeholder"
      :has-error="hasError"
      class="abz-text-input"
      :class="[`abz-input--${type}`]"
  >
    <template #input>
      <input v-bind="$attrs" :type="inputType" class="abz-text-input__input" @input="onUploadFile">
    </template>
    <template #input-helper>
      <abz-input-helper
          :error-text="errorText"
          :helper-text="helperText"
      />
    </template>
  </abz-fieldset>
</template>

<style>
.abz-text-input__input {
  border: none;
  height: 54px;
  padding: 14px 16px;
  box-sizing: var(--body-box-sizing);
  background: none;
  outline: none;
  width: 100%;
  //background-color: red;
}
.abz-text-input__input:focus {
  border: none;
  outline: none;
}
.abz-input--error .abz-text-input__input{
  //border-color: var(--error-color);
}
</style>