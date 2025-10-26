import { Await, useLoaderData } from 'react-router'
import EventsList from '../components/EventsList'
import { Suspense } from 'react'

// ✨ Promise를 반환 → Suspense로 로딩 UI → 데이터 준비되면 표시

function EventsPage() {
  // const data = useLoaderData() --> data는 { events: Promise } 이런 형태의 객체
  const { events } = useLoaderData()

  return (
    // 로딩 중일 때 "Loading..." 표시
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      {/* Promise가 완료되면 loadedEvents에 결과 담김 */}
      <Await resolve={events}>
        {loadedEvents => <EventsList events={loadedEvents.events} />}
      </Await>
    </Suspense>
  )
}

export default EventsPage

// 이벤트 데이터 가져오기 (2초)
export async function loadEvents() {
  const response = await fetch('http://localhost:8080/events')

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    })
  }

  return response.json() // { events: [...] } 형태로 반환
}

// loader: Promise를 바로 반환 (await 없음)
export async function loader() {
  return {
    events: loadEvents(), // ← await 없이 Promise 그대로 반환
  }
}
