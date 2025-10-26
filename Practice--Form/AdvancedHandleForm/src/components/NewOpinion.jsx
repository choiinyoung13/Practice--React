import { use } from 'react'
import { useActionState } from 'react'
import { OpinionsContext } from '../store/opinions-context'
import Submit from './Submit'

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext)

  const shareOpinionAction = async (prevFormState, formData) => {
    const userName = formData.get('userName')
    const title = formData.get('title')
    const body = formData.get('body')

    let errors = []

    if (title.trim() === '') {
      errors.push('Please provide your name.')
    }

    if (userName.trim().length < 5) {
      errors.push('Title must be at least five characters long.')
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('Opinion must be between 10 and 300 characters long.')
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValue: {
          userName,
          title,
          body,
        },
      }
    }

    await addOpinion({ userName, title, body })
    return {
      errors: null,
    }
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  })

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValue?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValue?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValue?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="error">
            {formState.errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  )
}
