const emailReqExp = new RegExp((/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/))
const phoneReqExp = new RegExp(/^[\+]{0,1}380([0-9]{9})$/)

const isValidRequired = (filed) => Boolean(filed)

const isValidEmail = (field) => {
  if (field.length < 2 || field.length > 100) return false
  return emailReqExp.test(field)
}

const isValidFileSize = (field, rule) => {
  return field?.size >= rule.min && field?.size <= rule.max
}

const isValidPhone = (field) => phoneReqExp.test(field)

const validationHandlers = {
  required: isValidRequired,
  email: isValidEmail,
  phone: isValidPhone,
  file_size_limit: isValidFileSize,
}

export default (fields, fieldsRules, fieldsErrorMessages) => {
  let isValid = true
  const fieldsToValid = Object.entries(fieldsRules.value)
    .filter(([fieldName]) => fieldName in fields.value)

  for (const [fieldName, rules] of fieldsToValid) {
    const field = fields.value[fieldName]

    for (const rule of rules) {
      if (typeof validationHandlers[rule.type] !== 'function') continue
      const isValidField = validationHandlers[rule.type](field, rule)

      if (isValidField) {
        fieldsErrorMessages.value[fieldName] = ''
        continue
      }
      fieldsErrorMessages.value[fieldName] = rule.message || 'invalid field'
      isValid = false
    }
  }

  return isValid
}