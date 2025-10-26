# React 폼 처리 방법 학습 정리

React에서 폼을 처리하는 두 가지 주요 방법을 학습했습니다.

## 1. onSubmit 방식 (기존 방법)

### useRef 사용

- `useRef`로 DOM 요소에 직접 접근
- `onSubmit` 이벤트 핸들러 사용
- `event.preventDefault()`로 기본 폼 제출 방지
- 수동으로 유효성 검사 및 상태 관리

### 커스텀 훅 사용

- `useInput` 훅으로 상태 관리 추상화
- 실시간 유효성 검사 (onBlur 이벤트)
- 재사용 가능한 `Input` 컴포넌트
- `onSubmit` 이벤트 핸들러 사용

### FormData 사용

- `FormData` API로 폼 데이터 자동 수집
- `name` 속성으로 폼 필드 식별
- 체크박스는 `getAll()` 메서드 사용
- `onSubmit` 이벤트 핸들러 사용

## 2. Form Action 방식 (React 19)

### useActionState 사용

- `useActionState` 훅으로 폼 상태 관리
- `action` prop으로 폼 액션 함수 연결
- 자동으로 `FormData` 전달
- 에러 상태와 입력값 자동 유지

### 비동기 처리

- 비동기 폼 액션 처리 가능
- 외부 함수 호출 (API 요청 등)
- 에러 처리 및 입력값 유지

## 3. 두 방법의 비교

### onSubmit 방식

**장점:** 명시적인 이벤트 처리, 세밀한 제어 가능, 기존 React 패턴과 일치
**단점:** 더 많은 보일러플레이트 코드, 수동 상태 관리 필요

### Form Action 방식

**장점:** 간결한 코드, 자동 FormData 처리, 에러 상태 자동 관리
**단점:** React 19+ 필요, 기존 패턴과 다름

## 4. 사용 시기

**onSubmit 사용:** 복잡한 폼 로직, 실시간 유효성 검사, 기존 React 버전
**Form Action 사용:** 간단한 폼 처리, 서버 액션 통합, React 19+ 환경
