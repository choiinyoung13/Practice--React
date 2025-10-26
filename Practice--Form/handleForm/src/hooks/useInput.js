import { useEffect, useState } from 'react'

export default function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue)
  const [didEdit, setDidEdit] = useState(false)

  const isInvalidValue =
    enteredValue !== '' && didEdit && !validationFn(enteredValue)
  console.log(isInvalidValue)

  function handleInputChange(value) {
    setEnteredValue(value)
    setDidEdit(false)
  }
  function handleInputBlur() {
    setDidEdit(true)
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: isInvalidValue,
  }
}
