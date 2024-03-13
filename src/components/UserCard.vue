<script setup>
import AbzAvatar from "@/components/ui/Avatar.vue";
import AbzTooltip from "@/components/ui/Tooltip.vue";

defineProps({
  user: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <div class="abz-user-card">
    <abz-avatar :src="user.photo" />
    <abz-tooltip>
      <template #content>{{ user.name }}</template>
      <div>{{ user.name }}</div>
    </abz-tooltip>
    <div class="abz-user-card__info">
      <abz-tooltip>
        <template #content>{{ user.position }}</template>
        <div>{{ user.position }}</div>
      </abz-tooltip>
      <abz-tooltip>
        <template #content>{{ user.email }}</template>
        <div>{{ user.email }}</div>
      </abz-tooltip>
      <abz-tooltip>
        <template #content><span>{{ user.phone }}</span></template>
          <div>{{ user.phone }}</div>
      </abz-tooltip>
    </div>
  </div>
</template>

<style>
.abz-user-card{
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  padding: 20px;
  background: white;
}
.abz-user-card__info{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>