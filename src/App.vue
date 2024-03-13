<script setup>
import AbzHeader from "@/components/Header.vue";
import AbzBanner from "@/components/Banner.vue";
import AbzUsersForm from "@/components/UsersForm.vue";
import AbzUsers from "@/components/Users.vue";
import AbzPreloader from "@/components/ui/Preloader.vue";
</script>

<template>
  <div class="abz-app">
    <abz-header />
    <suspense>
      <main class="abz-main">
        <abz-banner />
        <abz-users />
        <abz-users-form />
      </main>
      <template #fallback>
        <div class="suspense__fallback">
          <abz-preloader isLoading />
        </div>
      </template>
    </suspense>
  </div>
</template>

<style>
.abz-app{
  display: flex;
  flex-direction: column;
}
main.abz-main{
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 140px;
  padding-bottom: 100px;
}
.suspense__fallback{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}
</style>
