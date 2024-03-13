import {computed} from "vue";

export const useInputHelper = (props) => {

  const hasError = computed(() => {
    return Boolean(props.errorText)
  })
  const hasHelper = computed(() => {
    return Boolean(props.helperText)
  })

  return {
    hasError,
    hasHelper,
  }
}