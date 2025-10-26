# Redux 학습 저장소

Redux와 Redux Toolkit을 단계별로 학습하기 위한 실습 프로젝트들을 포함하고 있습니다.

## 📚 학습 목표

- Redux의 핵심 개념 이해 (Store, Actions, Reducers)
- Redux Toolkit의 현대적인 패턴 학습
- React-Redux를 통한 상태 관리 구현
- 실무에서 사용되는 고급 패턴과 최적화 기법

## 🗂️ 프로젝트 구조

```
redux/
├── basic/          # Redux 기초 학습 프로젝트
├── advanced/       # Redux 고급 학습 프로젝트
└── README.md       # 이 파일
```

## 🚀 프로젝트별 학습 내용

### 1. Basic 프로젝트 (`/basic`)

**학습 목표**: Redux의 기본 개념과 Redux Toolkit의 핵심 기능

**주요 기능**:

- 카운터 애플리케이션 (Counter)
- 인증 시스템 (Authentication)
- 다중 슬라이스 관리

**핵심 학습 포인트**:

- `createSlice`를 통한 리듀서와 액션 생성
- `configureStore`를 통한 스토어 설정
- `useSelector`와 `useDispatch` 훅 사용
- Immer를 통한 불변성 관리

**주요 파일**:

- `src/store/counter.js` - 카운터 상태 관리
- `src/store/auth.js` - 인증 상태 관리
- `src/components/Counter.js` - 카운터 컴포넌트
- `src/components/Auth.js` - 인증 컴포넌트

### 2. Advanced 프로젝트 (`/advanced`)

**학습 목표**: 실무에서 사용되는 고급 Redux 패턴과 최적화

**주요 기능**:

- 쇼핑 카트 애플리케이션
- UI 상태 관리
- 복잡한 상태 구조 관리
- 액션 크리에이터 패턴

**핵심 학습 포인트**:

- 복잡한 상태 구조 설계
- 액션 크리에이터를 통한 비동기 로직 처리
- UI 상태와 비즈니스 로직 분리
- 컴포넌트 최적화와 성능 고려사항

**주요 파일**:

- `src/store/cart.js` - 장바구니 상태 관리
- `src/store/ui.js` - UI 상태 관리
- `src/store/cart-actions.js` - 액션 크리에이터
- `src/components/Cart/` - 장바구니 관련 컴포넌트들

## 🛠️ 기술 스택

- **React 18/19** - UI 라이브러리
- **Redux Toolkit** - 상태 관리 라이브러리
- **React-Redux** - React와 Redux 연결
- **CSS Modules** - 스타일링
- **Firebase** (Advanced 프로젝트) - 백엔드 서비스

## 📖 학습 순서

### 1단계: Basic 프로젝트

1. Redux 기본 개념 이해
2. Redux Toolkit의 `createSlice` 학습
3. React-Redux 훅 사용법
4. 다중 슬라이스 관리

### 2단계: Advanced 프로젝트

1. 복잡한 상태 구조 설계
2. 액션 크리에이터 패턴
3. 비동기 로직 처리
4. 성능 최적화 기법

## 📝 주요 학습 개념

### Redux 핵심 개념

- **Store**: 애플리케이션의 전체 상태를 저장
- **Actions**: 상태 변경을 위한 이벤트
- **Reducers**: 액션에 따라 상태를 업데이트하는 순수 함수
- **Dispatch**: 액션을 스토어에 전달하는 함수

### Redux Toolkit의 장점

- **createSlice**: 보일러플레이트 코드 감소
- **Immer**: 불변성 관리 자동화
- **configureStore**: 개발자 도구 및 미들웨어 자동 설정
- **createAsyncThunk**: 비동기 로직 처리

### React-Redux 훅

- **useSelector**: 스토어에서 상태 선택
- **useDispatch**: 액션 디스패치
- **useStore**: 스토어 직접 접근 (고급 사용)
