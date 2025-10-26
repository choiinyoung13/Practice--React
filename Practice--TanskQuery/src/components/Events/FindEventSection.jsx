import { useRef, useState } from 'react'
import LoadingIndicator from '../UI/LoadingIndicator'
import ErrorBlock from '../UI/ErrorBlock'
import EventItem from './EventItem'
import { useQuery } from '@tanstack/react-query'
import { fetchEvents } from '../../util/http'

export default function FindEventSection() {
  const searchElement = useRef()
  const [searchTerm, setSearchTerm] = useState()

  //  Signal = "이전 요청 취소! 새 요청만 처리해줘"
  //  => 요청 진행중 새로운 요청이 들어오면 진행중인 요청을 끊고 새로운 요청 진행

  // 초기 상태 (검색 전)
  // enabled: false           // 쿼리 비활성화
  // data: undefined          // 데이터 없음

  // isPending: true    ✅    // "데이터 없네? → true"
  // isLoading: false   ❌    // "데이터 없지만 enabled: false라 요청 안 해 → false"

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { searchTerm: searchTerm }],
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
    enabled: searchTerm !== undefined,
  })

  function handleSubmit(event) {
    event.preventDefault()
    setSearchTerm(searchElement.current.value)
  }

  let content = <p>Please enter a search term to find events.</p>

  if (isLoading) {
    content = <LoadingIndicator />
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events.'}
      />
    )
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map(event => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  )
}
