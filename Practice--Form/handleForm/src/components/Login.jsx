import useInput from '../hooks/useInput'
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation'
import Input from './Input'
// 상태값(state)와 onBlur 이벤트를 활용한 이메일 유효성 검사 방법
// Input 컴포넌트 분리
export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: hasEmailError,
  } = useInput('', value => !!(isEmail(value) && isNotEmpty(value)))
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: haspasswordError,
  } = useInput('', value => hasMinLength(value, 6))

  function handleSubmit(event) {
    event.preventDefault()
    console.log(`♦ email: ${emailValue} \n♦ password: ${passwordValue}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label={'Email'}
          id={'email'}
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={e => {
            handleEmailChange(e.target.value)
          }}
          error={hasEmailError && 'Please enter a valid email'}
        />

        <Input
          label={'Password'}
          id={'password'}
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={e => {
            handlePasswordChange(e.target.value)
          }}
          error={haspasswordError && 'Please enter password more then 6.'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  )
}
