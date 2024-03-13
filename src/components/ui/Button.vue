<script setup>
import {defineProps} from "vue";

defineProps({
  type: {
    default: 'yellow',
    type: String,
    required: false,
    validator(value) {
      const availableButtonTypes = ['yellow']
      return availableButtonTypes.includes(value)
    }
  }
})
</script>

<template>
  <button :class="[`abz-button--${type}`]" class="abz-button" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style>
.abz-button,
.abz-button:focus,
.abz-button:active,
.abz-button:hover{
  border: none;
  outline: none;
  cursor: pointer;
}

.abz-button{
  border-radius: 80px;
  background-color: var(--primary-color);
  color: var(--black-86-color);
  line-height: 34px;
  height: 34px;
  padding: 0 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s background-color;
}

.abz-button:focus,
.abz-button:active,
.abz-button:hover{
  background-color: #FFE302;
}

.abz-button[disabled]{
  cursor: default;
  background-color: #B4B4B4;
  color: #FFFFFF;
}
</style>