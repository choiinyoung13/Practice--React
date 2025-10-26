import { useFetcher } from 'react-router'
import classes from './NewsletterSignup.module.css'
import { useEffect, useRef } from 'react'

function NewsletterSignup() {
  /* 
    useFetcher는 페이지 이동 없이 현재 페이지 유지하면서 
    action 함수나 loader 함수를 호출 (Form 제출이나 데이터 로딩을) 할 때 사용하는 훅

    1. action 호출 (Form 제출)
        const fetcher = useFetcher();

        // 방법 1: fetcher.Form
        <fetcher.Form method="post" action="/newsletter">
        <button>구독</button>
        </fetcher.Form>

        // 방법 2: fetcher.submit()
        fetcher.submit(
        { email: 'test@example.com' },
        { method: 'post', action: '/newsletter' }
        );


    2. loader 호출 (데이터 가져오기)
        const fetcher = useFetcher();

        // fetcher.load()
        fetcher.load('/events/123');  // eventDetailLoader 호출


    3. 언제 사용?
        - 좋아요 버튼 ✅
        - 장바구니 추가 ✅
        - 북마크 ✅
 */

  const fetcher = useFetcher()
  const { data, state } = fetcher
  const emailRef = useRef()

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message)
      emailRef.current.value = ''
    }
  }, [data, state])

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
        ref={emailRef}
      />
      <button>Sign up</button>
    </fetcher.Form>
  )
}

export default NewsletterSignup
