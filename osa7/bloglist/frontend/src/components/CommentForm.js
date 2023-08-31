import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, content))
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      ></input>
      <button type="submit">Comment</button>
    </form>
  )
}

export default CommentForm
