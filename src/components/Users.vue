<script setup>
import AbzButton from '@/components/ui/Button.vue'
import AbzUserCard from '@/components/UserCard.vue'
import {computed, ref} from "vue";
import {useInfiniteQuery, useQuery} from "@tanstack/vue-query";
import usersService from "@/api/usersService.js";

const count = 6

const usersQuery = ref(useInfiniteQuery({
  queryKey: ['users'],
  queryFn: usersService.getUsers,
  initialPageParam: { page: 1, count },
  getNextPageParam: (params) => ({ page: params.page + 1, count }),
  retry: 3
}))

const canUploadMore = computed(() => {
  const pagesLen = usersQuery.value.data?.pages?.length
  return usersQuery.value.data?.pages?.[pagesLen - 1]?.links?.next_url
})
const users = computed(() => {
  console.log('users')
  return usersQuery.value.data?.pages?.reduce((acc, p) => {
    acc.push(...(p?.users || []))
    return acc
  }, [])
})
const onUploadMore = () => {
  usersQuery.value.fetchNextPage()
}
</script>

<template>
  <div class="container abz-users" v-if="users">
    <div class="abz-users__cards">
      <abz-user-card
          v-for="user of users"
          :user="user"
          :key="user.id"
      />
    </div>
    <abz-button :disabled="usersQuery.isLoading" v-if="canUploadMore" @click="onUploadMore">Show more</abz-button>
  </div>
</template>

<style>
.abz-users.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}
.abz-users__cards{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(282px, 1fr));
  gap: 29px;
  width: 100%;
}
</style>