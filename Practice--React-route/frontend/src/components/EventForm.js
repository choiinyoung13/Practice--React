import {
  data,
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'

import classes from './EventForm.module.css'

function EventForm({ method, event }) {
  /* useActionData는 React Router에서 action 함수가 반환한 데이터를 컴포넌트에서 받아오는 훅입니다. */
  /* useRouteLoaderData는 특정 라우트의 loader 데이터를 어디서든 접근할 수 있게 해주는 훅 */
  const data = useActionData()
  const navigate = useNavigate()
  const navigation = useNavigation()

  const isSubmitting = navigation.state === 'submitting'

  function cancelHandler() {
    navigate('..')
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map(err => {
            return <li key={err}>{err}</li>
          })}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  )
}

export default EventForm

export async function action({ request, params }) {
  // formData는 request 객체의 메서드
  const formData = await request.formData()
  const eventData = {
    title: formData.get('title'),
    image: formData.get('image'),
    date: formData.get('date'),
    description: formData.get('description'),
  }

  let url = 'http://localhost:8080/events'

  if (request.method === 'PATCH') {
    const id = params.eventId
    url = 'http://localhost:8080/events/' + id
  }

  const response = await fetch(url, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })

  if (response.status === 422) {
    return response
  }

  if (!response.ok) {
    throw data({ message: 'Could not save event.' }, { status: 500 })
  }

  return redirect('/events')
}
