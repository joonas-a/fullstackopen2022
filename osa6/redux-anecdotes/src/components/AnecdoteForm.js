import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(setNotification(`You added '${content}'`, 5))
  }

  return (
    <div>
      <h2>Add new anecdote</h2>
      <form onSubmit={handleNewAnecdote}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
