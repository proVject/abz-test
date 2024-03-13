<script setup>
import {computed, ref} from "vue";
import {randomString} from "@/utils/random.js";

const props = defineProps({
  title: {
    required: false,
    type: String
  },
  modelValue: {
    required: false,
  },
  options: {
    required: true,
    type: Array,
  }
})
const emit = defineEmits(['update:modelValue'])

const radioName = ref(randomString())
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <div class="abz-radio__group">
    <div class="abz-radio__title" v-if="title">{{ title }}</div>
    <label
        class="abz-radio__label"
        v-for="opt of options"
        :key="opt.value"
    >
      <input
          class="abz-radio__input"
          type="radio"
          :name="radioName"
          :value="opt.value"
          v-model="value"
      >
      <span class="abz-radio__input-mark" />
      <span class="abz-radio__input-label" v-if="opt.label">{{ opt.label }}</span>
    </label>
  </div>
</template>

<style>
.abz-radio__group{
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.abz-radio__label{
  display: flex;
  align-items: center;
  gap: 12px;
}
.abz-radio__input{
  display: none;
}
.abz-radio__input-mark{
  position: relative;
  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;
  border: 1px solid var(--light-gray-color);
  border-radius: 50%;
  transition: .2s all;
}

.abz-radio__input-mark:before{
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 0;
  height: 0;
  background: var(--light-gray-color);
  border-radius: 50%;
  transition: .2s all;
}

.abz-radio__input:checked + .abz-radio__input-mark{
  border: 1px solid var(--secondary-color);
}

.abz-radio__input:checked + .abz-radio__input-mark:before{
  display: block;
  width: 10px;
  height: 10px;
  background: var(--secondary-color);
  transition: .2s all;
}
</style>
