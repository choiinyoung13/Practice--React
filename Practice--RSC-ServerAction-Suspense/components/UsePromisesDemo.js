'use client'

import { useState, use } from 'react'

export default function UsePromiseDemo({ usersPromise }) {
  // use 훅은 Promise를 받아서 그 결과값을 반환하되,
  // 완료될 때까지 컴포넌트를 일시 중단시켜서 Suspense가 로딩 상태를 처리하게 만드는 훅

  const users = use(usersPromise)
  const [count, setCount] = useState(0)

  return (
    <div className="rsc">
      <h2>RSC with Data Fetching</h2>
      <p>
        Uses <strong>async / await</strong> for data fetching.
      </p>
      <p>
        <button onClick={() => setCount(prevCount => prevCount + 1)}>
          Increment
        </button>
        <span>{count}</span>
      </p>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.title})
          </li>
        ))}
      </ul>
    </div>
  )
}
