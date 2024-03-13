<script setup>
import AbzAvatarIcon from '@/components/icons/Avatar.vue'
import AbzPreloader from '@/components/ui/Preloader.vue'
import {computed, defineProps, ref} from "vue";

const props = defineProps({
  src: {
    type: String,
    required: false,
  },
  size: {
    type: Number,
    required: false,
    default: 70
  }
})

const hasError = ref(false)
const isLoading = ref(true)

const styles = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
  }
})

const onError = () => {
  isLoading.value = false
  hasError.value = true
}
const onLoaded = () => {
  isLoading.value = false
  hasError.value = false
}

if (!props.src) {
  onLoaded()
}

</script>

<template>
  <div class="abz-avatar" :style="styles">
    <abz-avatar-icon v-if="!src || hasError" :width="size" :height="size"/>
    <img @error="onError" @load="onLoaded" v-else :src="src" alt="avatar">
    <abz-preloader :is-loading="isLoading" />
  </div>
</template>

<style>
.abz-avatar{
  display: inline-flex;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
}
.abz-avatar img{
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>