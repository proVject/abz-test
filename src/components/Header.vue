<script setup>
import AbzButton from '@/components/ui/Button.vue'
</script>

<template>
  <div class="abz-header">
    <div class="container abz-header__container">
      <a @click.prevent>
        <img class="abz-header__logo" src="/images/logo.svg" alt="logo">
      </a>
      <nav>
        <abz-button>Users</abz-button>
        <abz-button>Sign Up</abz-button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.abz-header{
  height: 60px;
  width: 100%;
  background: #fff;
  position: sticky;
}
.abz-header__container{
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
  align-items: center;
}
.abz-header__logo{
  max-width: 104px;
  height: 26px;
  aspect-ratio: 104/26;
}
.abz-header nav{
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>