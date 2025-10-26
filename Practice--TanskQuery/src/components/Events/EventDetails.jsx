import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import Header from '../Header.jsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js'
import { useState } from 'react'
import Modal from '../UI/Modal.jsx'
import ErrorBlock from '../UI/ErrorBlock.jsx'

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id

  const {
    data: event,
    isPending: isFetchPending,
    isError: isFetchError,
    error: fetchError,
  } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  })

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      // 1단계: 캐시를 "낡았다"고 표시만 함 (fetch는 안 함)
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none',
      })

      // 2단계: /events 페이지로 이동
      navigate('/events')

      // 3단계: NewEventsSection 컴포넌트가 새로 마운트됨
      // 4단계: NewEventsSection 안의 useQuery가 실행
      // 5단계: "어? ['events'] 캐시가 낡았네?"
      // 6단계: 자동으로 다시 패칭 및 캐시 동기화
    },
  })

  function handleStartDelete() {
    setIsDeleting(true)
  }

  function handleStopDelete() {
    setIsDeleting(false)
  }

  function handleDelete() {
    mutate({ id })
  }

  let content

  if (isFetchPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data...</p>
      </div>
    )
  }

  if (isFetchError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load event"
          message={
            fetchError.info?.message ||
            'Failed to fetch event data.  please try again later.'
          }
        />
      </div>
    )
  }

  if (event) {
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

    content = (
      <>
        {isDeleting && (
          <Modal onClose={handleStopDelete}>
            <h2>Are you sure?</h2>
            <p>
              Do you really want to delete this event? This action cannot be
              undone.
            </p>
            <div className="form-actions">
              {isPendingDeletion && <p>Deleting, please wait...</p>}
              {!isPendingDeletion && (
                <>
                  <button onClick={handleStopDelete} className="button-text">
                    Cancel
                  </button>
                  <button onClick={handleDelete} className="button">
                    Delete
                  </button>
                </>
              )}
            </div>
            {isErrorDeleting && (
              <ErrorBlock
                title="Failed to delete event"
                message={
                  deleteError.info?.message ||
                  'Failed to delete event, please try again later.'
                }
              />
            )}
          </Modal>
        )}

        <header>
          <h1>{event.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>

        <div id="event-details-content">
          <img src={`http://localhost:3000/${event.image}`} alt={event.image} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{event.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {event.time}
              </time>
            </div>
            <p id="event-details-description">{event.description}</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  )
}
