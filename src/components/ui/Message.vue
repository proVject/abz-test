<script setup>
defineProps({
  message: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    required: true
  }
})
</script>

<template>
<div class="abz-message">
  <h1>{{ message }}</h1>
  <img :src="imageSrc" alt="message image">
</div>
</template>

<style scoped>
.abz-message{
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  text-align: center;
}
.abz-message img{
  width: 100%;
  max-width: 328px;
}
</style>