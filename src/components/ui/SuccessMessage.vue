<script setup>
import AbzMessage from "@/components/ui/Message.vue";

const SUCCESS_IMAGE_SRC = '/images/success-image.svg'

defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<template>
  <abz-message
      :image-src="SUCCESS_IMAGE_SRC"
      :message="message"
  />
</template>
