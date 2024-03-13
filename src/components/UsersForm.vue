<script setup>
import AbzSuccessMessage from "@/components/ui/SuccessMessage.vue";
import AbzPreloader from "@/components/ui/Preloader.vue";
import AbzButton from "@/components/ui/Button.vue";
import AbzUploadInput from "@/components/ui/Inputs/UploadInput.vue";
import AbzTextInput from "@/components/ui/Inputs/TextInput.vue";
import AbzRadio from "@/components/ui/Inputs/Radio.vue";
import {computed, ref} from "vue";
import {useMutation, useQuery, useQueryClient} from '@tanstack/vue-query'
import positionsService from "@/api/positionsService.js";
import {UseValidateRequiredFormFields} from "@/hooks/useValidateRequiredFormFields.js";
import validateForm from "@/utils/validateForm.js";
import usersService from "@/api/usersService.js";

const queryClient = useQueryClient()
console.log('queryClient', queryClient)

const shownSuccessMessage = ref(false)
const isAddingUser = ref(false)

const newUser = ref({
  name: '',
  email: '',
  phone: '',
  photo: '',
  position_id: null
})

const newUserRules = ref({
  name: [
    {type: 'required', message: 'Name is required' }
  ],
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Invalid email format' }
  ],
  phone: [
    { type: 'required', message: 'Phone is required' },
    { type: 'phone', message: 'Invalid phone number format' }
  ],
  photo: [
    { type: 'required', message: 'Photo is required' },
    { type: 'file_size_limit', min: 0, max: 5 * 1024 * 1024, message: 'The photo size must not be greater than 5 Mb.' }
  ],
})

const newUserErrorMessages = ref({})

const positionsQuery = ref(useQuery({
  queryKey: ['positions'],
  queryFn: positionsService.getPositions,
}))

const addUser = useMutation({
  mutationFn: usersService.addUser,
  onSuccess: async () => {
    shownSuccessMessage.value = true
  },
  onSettled: async () => {
    isAddingUser.value = false
  },
})

const positionOptions = computed(() => {
  return positionsQuery.value?.data?.map(p => ({ value: p.id, label: p.name })) ?? []
})

const { areValidRequiredFields } = UseValidateRequiredFormFields(newUser, newUserRules)

const refetchUsers = () => {
  queryClient.resetQueries({ queryKey: ['users'] })
}

const onSubmit = () => {
  const isValid = validateForm(newUser, newUserRules, newUserErrorMessages)
  if (!isValid) return

  isAddingUser.value = true
  addUser.mutate(newUser.value)
  refetchUsers()
}

await positionsQuery.value.suspense()
newUser.value.position_id = positionsQuery.value.data?.[0]?.id || null

</script>

<template>
  <abz-preloader v-if="positionsQuery.isLoading"/>
  <span v-else-if="positionsQuery.isError">Error: {{ positionsQuery.error.message }}</span>
  <abz-success-message class="container" v-else-if="shownSuccessMessage" message="User successfully registered"/>
  <form
      v-else-if="positionsQuery.data"
      @submit.prevent="onSubmit"
      class="container abz-users-form"
  >
    <abz-text-input
        placeholder="Your name"
        v-model:text="newUser.name"
        :error-text="newUserErrorMessages.name"
    />
    <abz-text-input
        placeholder="Email"
        v-model:text="newUser.email"
        :error-text="newUserErrorMessages.email"
    />
    <abz-text-input
        placeholder="Phone"
        helper-text="+38 (XXX) XXX - XX - XX"
        v-model:text="newUser.phone"
        :error-text="newUserErrorMessages.phone"
    />
    <abz-radio
        title="Select your position"
        :options="positionOptions"
        v-model="newUser.position_id"
    />
    <abz-upload-input
        v-model:file="newUser.photo"
        :error-text="newUserErrorMessages.photo"
        accept="image/jpeg, image/jpg"
    />
<!--    {{ positionsQuery.data }}-->
    <abz-button :disabled="!areValidRequiredFields || isAddingUser" style="align-self: center">Sign Up</abz-button>
  </form>
</template>

<style scoped>
.abz-users-form{
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 50px;
  max-width: 380px;
}
.abz-users-form .abz-input{
  margin-bottom: 0;
}
</style>