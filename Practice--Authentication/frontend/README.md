📝 토큰 유효기간 처리 흐름

1단계: 로그인 시 (Authentication.js)
// 로그인 성공하면:
    localStorage.setItem('token', token) // 토큰 저장
    const expiration = new Date()
    expiration.setHours(expiration.getHours() + 1)          // 현재시간 + 1시간
    localStorage.setItem('expiration', expiration.toISOString())  // 만료시간 저장

→ 토큰과 만료시간(1시간 후)을 localStorage에 저장


2단계: 앱 시작 시 (App.js & Root.js)
// App.js: 루트 라우트에서 tokenLoader 실행
    loader: tokenLoader  // 페이지 로드될 때마다 토큰 체크
    Root.js에서 자동 로그아웃 타이머 설정:
    useEffect(() => {
    if (token === 'EXPIRED') {
        submit(null, { action: '/logout', method: 'post' })  // 이미 만료됨 → 바로 로그아웃
        return
    }
    
    const tokenDuration = getTokenDuration()  // 남은 시간 계산
    setTimeout(() => {
        submit(null, { action: '/logout', method: 'post' })  // 남은 시간 후 자동 로그아웃
    }, tokenDuration)
    }, [token])

→ 남은 시간만큼 타이머 설정해서 자동으로 로그아웃


3단계: 토큰 체크 로직 (auth.js)
    // 1. 남은 시간 계산
    getTokenDuration()
    → 만료시간 - 현재시간 = 남은 밀리초

    // 2. 토큰 유효성 체크
    getAuthToken()
    → 토큰 없으면: null
    → 만료됐으면: 'EXPIRED'
    → 유효하면: 토큰 반환

    // 3. 보호된 페이지 체크
    checkAuthLoader()
    → 토큰 없으면 /auth로 리다이렉트

    🎬 실제 동작 시나리오
    시나리오 1: 로그인 후 사용 중
        10:00 AM 로그인 → 만료시간 11:00 AM 저장
        Root 컴포넌트에서 1시간 타이머 설정
        11:00 AM 되면 자동으로 로그아웃

    시나리오 2: 토큰 만료된 상태로 재접속
        어제 로그인한 상태로 오늘 페이지 새로고침
        getAuthToken()이 'EXPIRED' 반환
        Root의 useEffect에서 즉시 로그아웃 실행

    시나리오 3: 보호된 페이지 접근
        로그인 없이 /events/new 접근
        checkAuthLoader()가 토큰 체크
        토큰 없으면 /auth로 리다이렉트


💡 핵심 포인트
✅ localStorage에 토큰 + 만료시간 같이 저장
✅ Root 컴포넌트에서 setTimeout으로 자동 로그아웃 예약
✅ 페이지 로드마다 토큰 유효성 검사
✅ 보호된 페이지는 loader로 접근 차단

이렇게 토큰 만료를 관리하고 있습니다! 😊