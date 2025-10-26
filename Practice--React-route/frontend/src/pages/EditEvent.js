import { useRouteLoaderData } from 'react-router'
import EventForm from '../components/EventForm'

export default function EditEventPage() {
  const { event } = useRouteLoaderData('event-detail')

  return <EventForm method={'patch'} event={event.event} />
}
