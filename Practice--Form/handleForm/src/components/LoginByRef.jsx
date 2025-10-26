import { useRef, useState } from 'react'

// Ref을 활용한 이메일 유효성 검사 방법
export default function LoginByRef() {
  const [IsInvaildEmail, setIsInvaildEmail] = useState(false)

  const email = useRef()
  const password = useRef()

  function handleSubmit(event) {
    event.preventDefault()

    const emailValue = email.current.value
    const IsVaildEmail = emailValue.includes('@')

    if (emailValue.trim() === '') return
    if (!IsVaildEmail) {
      setIsInvaildEmail(true)
      return
    }

    setIsInvaildEmail(false)
    console.log('HTTP request is feching...')
    event.target.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" ref={email} />

          <div className="control-error">
            {IsInvaildEmail && <p>Please enter a vaild email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  )
}
