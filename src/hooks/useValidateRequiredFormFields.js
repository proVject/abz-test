import {computed} from "vue";

export const UseValidateRequiredFormFields = (fields, fieldRules) => {
  const areValidRequiredFields = computed(() => {
    let result = true
    const filteredFields = Object.entries(fieldRules.value)
      .filter(([fieldName, rules]) => fieldName in fields.value && rules.some(r => r.type === 'required'))

    if (!filteredFields.length) return true

    filteredFields.forEach(([fieldName, rules]) => {
      rules.forEach(r => {
        if (r.type !== 'required') return
        if (!fields.value[fieldName]) result = false
      })
    })

    return result
  })

  return {areValidRequiredFields}
}