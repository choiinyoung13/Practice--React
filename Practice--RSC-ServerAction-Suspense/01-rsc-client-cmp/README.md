# React Server Component (RSC) & Client Component 가이드

## 📚 핵심 개념

### 1. 서버 컴포넌트 (Server Component)

**서버 컴포넌트는 서버에서만 실행되는 컴포넌트입니다.**

```javascript
// components/RSCDemo.js
export default async function RSCDemo() {
  console.log('RSCDemo rendered') // 이 로그는 서버 터미널에만 출력됨
  return (
    <div className="rsc">
      <h2>A React Server Component</h2>
      <p>서버에서만 렌더링됩니다!</p>
    </div>
  )
}
```

#### ✅ 서버 컴포넌트의 특징

- **기본값**: Next.js App Router에서 모든 컴포넌트는 기본적으로 서버 컴포넌트
- **'use client' 없음**: 특별한 지시자가 필요 없음
- **async/await 사용 가능**: 데이터베이스나 파일 시스템에 직접 접근 가능
- **서버에서만 실행**: 클라이언트 브라우저에 JavaScript 코드가 전송되지 않음
- **보안**: API 키, DB 비밀번호 등을 안전하게 사용 가능

#### 🎯 서버 컴포넌트를 사용하는 경우

- 데이터베이스에서 데이터를 가져올 때
- 파일을 읽거나 백엔드 API를 호출할 때
- 민감한 정보(API 키 등)를 다룰 때
- 큰 라이브러리를 사용하지만 클라이언트에 전송하고 싶지 않을 때

### 2. 클라이언트 컴포넌트 (Client Component)

**클라이언트 컴포넌트는 브라우저에서 상호작용이 필요한 컴포넌트입니다.**

```javascript
// components/ClientDemo.js
'use client' // 👈 이 지시자가 핵심!

export default function ClientDemo({ children }) {
  console.log('ClientDemo rendered') // 서버와 브라우저 콘솔 모두에 출력됨
  return (
    <div className="client-cmp">
      <h2>A React Client Component</h2>
      <p>클라이언트에서 상호작용 가능!</p>
      {children}
    </div>
  )
}
```

#### ✅ 클라이언트 컴포넌트의 특징

- **'use client' 필수**: 파일 최상단에 이 지시자를 작성해야 함
- **양쪽에서 실행**: 서버에서 한 번, 브라우저에서 한 번 렌더링됨 (Hydration)
- **React Hook 사용 가능**: `useState`, `useEffect`, `onClick` 등 모든 상호작용 기능 사용 가능
- **이벤트 핸들러**: 버튼 클릭, 폼 제출 등 사용자 상호작용 처리

#### 🎯 클라이언트 컴포넌트를 사용하는 경우

- 버튼 클릭, 폼 입력 등 사용자 이벤트를 처리할 때
- `useState`, `useEffect` 같은 React Hook을 사용할 때
- 브라우저 API(window, localStorage 등)를 사용할 때
- 실시간으로 화면을 업데이트해야 할 때

## 🔗 서버 컴포넌트와 클라이언트 컴포넌트 결합하기

### ❌ 잘못된 방법

클라이언트 컴포넌트 안에 서버 컴포넌트를 직접 import하면 **서버 컴포넌트가 클라이언트 컴포넌트로 변환됩니다**.

```javascript
'use client'

import RSCDemo from './RSCDemo' // ❌ 이렇게 하면 안 됨!

export default function ClientDemo() {
  return (
    <div>
      <RSCDemo /> {/* RSCDemo가 클라이언트 컴포넌트로 변해버림 */}
    </div>
  )
}
```

### ✅ 올바른 방법: children props 사용

**부모 컴포넌트(서버 컴포넌트)에서 조립하고, children으로 전달하세요!**

```javascript
// app/page.js (서버 컴포넌트)
import ClientDemo from '@/components/ClientDemo'
import RSCDemo from '@/components/RSCDemo'

export default function Home() {
  return (
    <main>
      <ClientDemo>
        <RSCDemo /> {/* ✅ RSCDemo는 서버 컴포넌트로 유지됨 */}
      </ClientDemo>
    </main>
  )
}
```

```javascript
// components/ClientDemo.js
'use client'

export default function ClientDemo({ children }) {
  return (
    <div className="client-cmp">
      <h2>A React Client Component</h2>
      {children} {/* 서버 컴포넌트가 여기에 들어옴 */}
    </div>
  )
}
```

## 🎨 컴포지션 패턴의 핵심

1. **서버 컴포넌트(page.js)가 최상위에서 조합을 담당**
2. **클라이언트 컴포넌트는 `children` props를 받도록 설계**
3. **서버 컴포넌트를 `children`으로 전달하면 서버 컴포넌트 특성 유지**

이렇게 하면:

- 상호작용이 필요한 부분만 클라이언트 컴포넌트로 만들고
- 데이터 페칭이나 서버 로직은 서버 컴포넌트로 유지하여
- **최적의 성능과 보안**을 얻을 수 있습니다!
