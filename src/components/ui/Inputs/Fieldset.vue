<script setup>
defineProps({
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  inputValue: {
    type: String,
    required: false
  },
  hasError: {
    type: Boolean,
    required: false,
    default: false
  },
})
</script>

<template>
  <fieldset
      v-bind="$attrs" class="abz-input w-100"
      :class="{ 'abz-input--error': hasError }"
  >
    <label :class="{'abz-input__label': placeholder}" class="w-100">
      <slot name="input"></slot>
      <span class="abz-input__label-span text-ellipsis" :class="{'has-value': inputValue}">
        {{ placeholder }}
      </span>
    </label>
    <slot name="input-helper"/>
  </fieldset>
</template>

<style>
.abz-input {
  outline: none;
  border: none;
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

.abz-input__label {
  position: relative;
  border: 1px solid var(--light-gray-color);
  outline: none;
  box-shadow: none;
  padding: 0;
  border-radius: 4px;
  box-sizing: var(--body-box-sizing);
  display: flex;
}

.abz-input__label-span {
  position: absolute;
  color: var(--gray-color);
  background-color: var(--background-color);
  padding: 0 4px;
  top: 0;
  cursor: text;
  transform: translate(16px, 14px);
}

.abz-input--error .abz-input__label {
  border-color: var(--error-color);
}

.abz-input--error .abz-input__label-span {
  color: var(--error-color);
}

.abz-input__label-span {
  transition: .2s all;
}

.abz-input.abz-input--error input:focus + .abz-input__label-span,
.abz-input__label-span.has-value {
  transform: translate(12px, -50%);
  font-size: 12px;
  line-height: 14px;
}
</style>