import { useEffect } from 'react'
import classes from './Notification.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store/ui'

const Notification = props => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    if (!notification) return

    const timeout = setTimeout(() => {
      dispatch(uiActions.resetNotification())
    }, 2000)

    // 의존성 배열이 변경될 or 컴포넌트가 언마운트될 때 호출
    return () => {
      clearTimeout(timeout)
    }
  }, [notification, dispatch])

  let specialClasses = ''

  if (props.status === 'error') {
    specialClasses = classes.error
  }
  if (props.status === 'success') {
    specialClasses = classes.success
  }

  const cssClasses = `${classes.notification} ${specialClasses}`

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  )
}

export default Notification
