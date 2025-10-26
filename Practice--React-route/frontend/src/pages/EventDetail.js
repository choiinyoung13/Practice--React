import { Await, data, redirect, useRouteLoaderData } from 'react-router'
import EventItem from '../components/EventItem'
import { Suspense } from 'react'
import EventsList from '../components/EventsList'

// ✨ 이벤트 상세 + 전체 목록 동시에 로딩 (각각 독립적으로)
export default function EventDetailPage() {
  // 부모 라우트(id: 'event-detail')의 loader 데이터 가져오기
  const { event, events } = useRouteLoaderData('event-detail')

  return (
    <>
      {/* 1. 이벤트 상세 - 이미 로딩됨 (await 했음) */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {loadedEvent => <EventItem event={loadedEvent.event} />}
        </Await>
      </Suspense>

      {/* 2. 전체 이벤트 목록 - 백그라운드에서 로딩 중 (Promise) */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {loadedEvents => <EventsList events={loadedEvents.events} />}
        </Await>
      </Suspense>
    </>
  )
}

// 전체 이벤트 목록 가져오기
async function loadEvents() {
  const response = await fetch('http://localhost:8080/events')

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    })
  }

  return response.json() // { events: [...] }
}

// 특정 이벤트 상세 정보 가져오기
async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id)

  if (!response.ok) {
    return data(
      { message: 'Could not fetch details for selected event.' },
      { status: 500 }
    )
  }

  return response.json() // { event: {...} }
}

// loader: event는 기다림(await), events는 안 기다림(Promise)
export async function loader({ request, params }) {
  const id = params.eventId

  return {
    event: await loadEvent(id), // ← 필수 데이터! 기다림 (즉시 필요)
    events: loadEvents(), // ← 선택 데이터! 안 기다림 (나중에 표시)
  }
}

// action: 이벤트 삭제 처리
export async function action({ request, params }) {
  const id = params.eventId

  // DELETE 요청
  const response = await fetch('http://localhost:8080/events/' + id, {
    method: request.method, // DELETE
  })

  if (!response.ok) {
    return data({ message: 'Failed to delete event.' }, { status: 500 })
  }

  // 삭제 성공 → 목록 페이지로 이동
  return redirect('/events')
}
