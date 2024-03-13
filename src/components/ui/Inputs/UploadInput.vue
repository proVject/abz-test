<script setup>
import AbzInputHelper from "@/components/ui/Inputs/InputHelper.vue";
import AbzFieldset from "@/components/ui/Inputs/Fieldset.vue";
import {computed, defineSlots, defineProps, defineEmits} from "vue";
import {useInputHelper} from "@/hooks/useInputHelper.js";

const props = defineProps({
  type: {
    default: 'normal',
    type: String,
    required: false,
    validator(value) {
      const availableInputTypes = ['normal']
      return availableInputTypes.includes(value)
    }
  },
  file: {
    type: File,
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
    required: false
  },
  errorText: {
    type: String,
    default: '',
    required: false,
  },
  helperText: {
    type: String,
    default: '',
    required: false,
  },
  uploadText: {
    type: String,
    required: false,
    default: 'Upload',
  },
  noFileText: {
    type: String,
    required: false,
    default: 'Upload your file',
  }
})

const emit = defineEmits(['update:file'])
const {hasError} = useInputHelper(props)

const fileName = computed(() => {
  return props.file?.name
})
const onUploadFile = (e) => {
  emit('update:file', e.target.files[0])
}
</script>

<template>
  <abz-fieldset
      :has-error="hasError"
      class="abz-upload-input"
      :class="[`abz-input--${type}`]"
  >
    <template #input>
      <input v-bind="$attrs" type="file" class="abz-upload-input__input" @change="onUploadFile">
      <div class="abz-upload-input__container w-100">
        <div class="upload align-center">
          {{ uploadText }}
        </div>
        <div class="filename align-center-start" :class="{ 'no-file': !fileName }">{{ fileName || noFileText }}</div>
      </div>
    </template>
    <template #input-helper>
      <abz-input-helper
          :error-text="errorText"
          :helper-text="helperText"
      />
    </template>
  </abz-fieldset>
</template>

<style>
.abz-upload-input__input {
  display: none;
}

.abz-upload-input__container {
  cursor: pointer;
  display: flex;
}

.abz-upload-input__container .upload {
  color: var(--black-86-color);
  border-radius: 4px 0 0 4px;
  border: 1px solid var(--black-86-color);
  padding: 14px 15px;
}

.abz-upload-input__container .filename {
  color: var(--black-86-color);
  border-radius: 0 4px 4px 0;
  border-top: 1px solid var(--light-gray-color);
  border-right: 1px solid var(--light-gray-color);
  border-bottom: 1px solid var(--light-gray-color);
  padding: 14px 16px;
  flex: 1;
}

.abz-upload-input__container .filename.no-file {
  color: var(--gray-color);
}

.abz-input--error .abz-upload-input__container .filename.no-file {
  color: var(--error-color);
}

.abz-input--error .abz-upload-input__container .upload,
.abz-input--error .abz-upload-input__container .filename {
  border-color: var(--error-color);
}

</style>