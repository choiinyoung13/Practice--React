import { Link, useNavigate, useParams } from 'react-router-dom'
import Modal from '../UI/Modal.jsx'
import EventForm from './EventForm.jsx'
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import LoadingIndicator from '../UI/LoadingIndicator.jsx'
import ErrorBlock from '../UI/ErrorBlock.jsx'

export default function EditEvent() {
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  const {
    data: event,
    isPending: isFetchPending,
    isError: isFetchError,
    error: fetchError,
  } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  })

  const { mutate } = useMutation({
    mutationFn: updateEvent,

    // onMutate는 mutate 호출 시 바로 실행되는 함수
    onMutate: async data => {
      // ✨낙관적 업데이트✨

      // data는 mutate 호출 시 인자값으로 같이 넘긴 값이 들어있다 / data = { id, event: formData }
      const newEvent = data.event

      // 캐싱 안 되게 막기
      await queryClient.cancelQueries({ queryKey: ['events', id] })

      // http 요청 오류 시 롤백을 위해 원복 데이터 가지고 있기
      const previousEvent = queryClient.getQueryData(['events', id])

      // 캐싱 데이터 직접 저장
      queryClient.setQueryData(['events', id], newEvent)

      // 반환하면 onError함수에서 받아서 쓸 수 있음
      return { previousEvent }
    },

    onError: (error, data, context) => {
      // error => error 객체
      // data => updateEvent에서 에러 시 반환한 데이터
      // context => onMutate 함수에서 반환한 데이터

      // 에러 시 미리 저장한 원본 데이터로 롤백
      queryClient.setQueryData(['events', id], context.previousEvent)
    },

    // onSettled 성공 여부 상관없이 mutation이 완료되면 호출되는 함수
    // 낙관적으로 업데이트한 데이터를 업데이트 서버의 실제 데이터로 교체해서 최종 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['events', id] })
    },
  })

  function handleSubmit(formData) {
    mutate({ id, event: formData })
    navigate('../')
  }

  function handleClose() {
    navigate('../')
  }

  let content

  if (isFetchPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    )
  }

  if (isFetchError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            fetchError.info?.message ||
            'Failed to fetch event data.  please check your inputs and try again later.'
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    )
  }

  if (event) {
    content = (
      <EventForm inputData={event} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    )
  }

  return <Modal onClose={handleClose}>{content}</Modal>
}

// ✨ tanskquery와 react-route의 loader, action을 같이 쓸 경우 ✨

// export function loader({ params }) {
//   return queryClient.fetchQuery({
//     queryKey: ['events', params.id],
//     queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
//   });
// }

// export async function action({ request, params }) {
//   const formData = await request.formData();
//   const updatedEventData = Object.fromEntries(formData);
//   await updateEvent({ id: params.id, event: updatedEventData });
//   await queryClient.invalidateQueries(['events']);
//   return redirect('../');
// }
