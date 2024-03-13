<script setup>
import AbzButton from '@/components/ui/Button.vue'
</script>

<template>
<div class="abz-banner">
  <div class="container abz-banner__container">
    <h1>Test assignment for front-end developer</h1>
    <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
    <abz-button>Sign Up</abz-button>
  </div>
</div>
</template>

<style scoped>
.abz-banner{
  position: relative;
  min-height: 500px;
  height: fit-content;
  background-image: url("/images/banner.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom center;
  max-width: 1170px;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.abz-banner:before{
  content: "";
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: brightness(0.5);
  z-index: 0;
}
.abz-banner__container{
  padding-top: 20px;
  padding-bottom: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  gap: 22px;
  max-width: 380px;
}
.abz-banner h1,
.abz-banner p{
  color: white
}

@media screen and (min-width: 1024px) {
  .abz-banner{
    min-height: 650px;
    height: fit-content;
  }
}
</style>