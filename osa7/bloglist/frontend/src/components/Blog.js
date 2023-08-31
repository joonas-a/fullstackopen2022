import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { voteBlog, removeBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  // console.log(blog)

  const handleLike = (event) => {
    event.stopPropagation()
    const blogToLike = blogs.find((b) => b.id === blog.id)
    dispatch(voteBlog(blogToLike))
    dispatch(
      setNotification(
        `Liked blog: ${blog.title} by ${blog.author}`,
        'success',
        5
      )
    )
  }

  const handleRemoval = async (event) => {
    event.stopPropagation()
    const confirmation = window.confirm(
      `Delete ${blog.title} by ${blog.author}?`
    )
    if (confirmation) {
      const blogToRemove = blogs.find((b) => b.id === blog.id)

      dispatch(removeBlog(blogToRemove))
      navigate('/')
      dispatch(
        setNotification(
          `Removed blog: ${blog.title} by ${blog.author}`,
          'success',
          5
        )
      )
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h3>
        {blog.title} by {blog.author}
      </h3>
      Url: {blog.url}
      <br />
      {blog.likes}
      {' Likes '}
      <button id="like-button" onClick={(event) => handleLike(event)}>
        Like
      </button>
      <br />
      Added by: {blog.user.name ? blog.user.name : user.name}
      <br />
      {user.username === blog.user.username && (
        <button
          className="deleteButton"
          onClick={(event) => handleRemoval(event)}
        >
          Delete
        </button>
      )}
      <h4>Comments</h4>
      {blog.comments.length !== 0 ? (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment._id}>{comment.content}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  )
}

export default Blog
