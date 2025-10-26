import { Link, useNavigate } from 'react-router-dom'

import Modal from '../UI/Modal.jsx'
import EventForm from './EventForm.jsx'
import ErrorBlock from '../UI/ErrorBlock.jsx'
import { useMutation } from '@tanstack/react-query'
import { createNewEvent, queryClient } from '../../util/http.js'

export default function NewEvent() {
  const navigate = useNavigate()

  function handleSubmit(formData) {
    mutate({ event: formData })
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      // exact:ture 로 설정하면 정확히 ['events'] 쿼리키 값을 가진 캐시만 무효화 시킴
      // queryClient.invalidateQueries({ queryKey: ['events'] })

      // ✨✨'/' 로 이동하면 NewEventsSection 컴포넌트가 새로 마운트 되기 때문에 따로 캐시 무효화 작업할 필요 없음
      navigate('/')
    },
  })

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button disabled={isPending} type="submit" className="button">
            {isPending ? 'Submitting..' : 'Create'}
          </button>
        </>
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            'Failed to create event. Please check your inputs and try again later.'
          }
        />
      )}
    </Modal>
  )
}
