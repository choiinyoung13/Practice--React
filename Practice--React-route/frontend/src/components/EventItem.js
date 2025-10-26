import { Link, useSubmit } from 'react-router'
import classes from './EventItem.module.css'

function EventItem({ event }) {
  const submit = useSubmit()

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?')

    /* useSubmit은 React Router에서 제공하는 훅으로,
       프로그래밍 방식으로 Form을 제출할 수 있게 해줍니다.
       즉, <Form> 컴포넌트를 사용하지 않고도 action을 호출할 수 있습니다. */

    /* 프로그래밍 방식으로 제출
    submit(
      { title: '새 이벤트', date: '2025-10-21' },  // 데이터
      { method: 'post', action: '/events' }       // 옵션
    );
    action을 안 적으면 제일 가깝게 위치한 action을 호출함
     -> EventDetailPage의 deleteEventAction이 호출됨
     */

    if (proceed) {
      submit(null, { method: 'DELETE' })
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  )
}

export default EventItem
