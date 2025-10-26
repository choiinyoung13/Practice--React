# React Router 학습 정리

## 📚 React Router란?

React Router는 React 애플리케이션에서 클라이언트 사이드 라우팅을 구현하는 라이브러리입니다. SPA(Single Page Application)에서 URL 변경에 따라 다른 컴포넌트를 렌더링할 수 있게 해줍니다.

## 🚀 이 프로젝트에서 사용한 패턴들

### 1. createBrowserRouter 사용

```jsx
// App.js에서 사용한 방식
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  // 라우트 설정들...
])

function App() {
  return <RouterProvider router={router} />
}
```

**왜 이 방식을 사용했나요?**

- `createBrowserRouter`는 React Router v6의 최신 방식
- `BrowserRouter`보다 더 많은 기능과 최적화 제공
- 데이터 로딩과 에러 처리를 더 세밀하게 제어 가능

### 2. 중첩 라우팅 구조

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // 최상위 레이아웃
    errorElement: <ErrorPage />, // 에러 처리
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />, // 이벤트 관련 레이아웃
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader, // 이벤트 목록 데이터 로딩
          },
          {
            path: ':eventId',
            id: 'event-detail', // 고유 ID로 데이터 캐싱
            loader: eventDetailLoader, // 이벤트 상세 데이터 로딩
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction, // 삭제 액션
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction, // 수정 액션
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction, // 생성 액션
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction, // 뉴스레터 구독 액션
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
      },
    ],
  },
])
```

**이 구조의 장점:**

- `/events` 경로의 모든 페이지는 `EventsRootLayout` 공유
- `/events/:eventId` 경로의 모든 페이지는 `eventDetailLoader` 데이터 공유
- 코드 중복 최소화, 일관된 사용자 경험

### 3. Loader와 Action 활용

#### Loader - 데이터 미리 로딩

```jsx
// EventsPage에서 사용
import EventsPage, { loader as eventsLoader } from './pages/Events'

// Route에서 사용
{
  index: true,
  element: <EventsPage />,
  loader: eventsLoader,  // 페이지 진입 전 데이터 로딩
}
```

#### Action - 폼 제출 처리

```jsx
// EventForm에서 사용
import { action as manipulateEventAction } from './components/EventForm'

// Route에서 사용
{
  path: 'new',
  element: <NewEventPage />,
  action: manipulateEventAction,  // 폼 제출 처리
}
```

**Loader vs Action 역할:**

- **Loader**: 페이지 진입 전 데이터 준비 (읽기)
- **Action**: 폼 제출이나 데이터 변경 처리 (쓰기)

### 4. 에러 처리 계층 구조

```jsx
{
  path: '/',
  element: <RootLayout />,
  errorElement: <ErrorPage />,  // 모든 하위 라우트의 에러 처리
  children: [
    // 각 라우트별 에러는 상위에서 처리됨
  ]
}
```

**에러 처리 전략:**

- 최상위에서 일반적인 에러 처리
- 사용자에게 친화적인 에러 메시지 제공
- 개발자에게는 디버깅 정보 제공

### 5. 데이터 최적화

```jsx
{
  path: ':eventId',
  id: 'event-detail',           // 고유 ID로 데이터 캐싱
  loader: eventDetailLoader,
  children: [
    { index: true, element: <EventDetailPage /> },
    { path: 'edit', element: <EditEventPage /> }  // 같은 데이터 재사용
  ]
}
```

**데이터 최적화 효과:**

- 같은 데이터를 여러 페이지에서 재사용
- 불필요한 서버 요청 방지
- 빠른 페이지 전환 경험

## 📁 이 프로젝트의 실제 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── EventForm.js     # 이벤트 생성/수정 폼 (action 포함)
│   ├── MainNavigation.js
│   ├── EventItem.js
│   └── ...
├── pages/              # 페이지 컴포넌트 (loader/action 포함)
│   ├── Root.js         # 최상위 레이아웃
│   ├── Home.js
│   ├── Events.js       # 이벤트 목록 (loader 포함)
│   ├── EventDetail.js  # 이벤트 상세 (loader/action 포함)
│   ├── EditEvent.js    # 이벤트 수정
│   ├── NewEvent.js     # 이벤트 생성
│   ├── Newsletter.js   # 뉴스레터 (action 포함)
│   ├── Authentication.js
│   └── Error.js        # 에러 페이지
└── App.js              # 라우터 설정
```

## 🔗 이 프로젝트에서 사용한 훅들

### 실제 사용된 훅들

- `useLoaderData()`: Events.js, EventDetail.js에서 사용
- `useActionData()`: EventForm.js에서 폼 에러 처리
- `useNavigate()`: 페이지 이동 시 사용
- `useParams()`: EventDetail.js에서 eventId 가져오기
- `useNavigation()`: 로딩 상태 표시
- `useFetcher()`: Newsletter 구독 시 사용

### 사용하지 않은 고급 훅들

- `useRevalidator()`: 데이터 새로고침 (필요시 추가 가능)
- `useRouteLoaderData()`: 특정 라우트 데이터 접근
- `useSubmit()`: 프로그래밍 방식 폼 제출


