import { useState } from 'react'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { voteBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const handleLike = (event) => {
    event.stopPropagation()
    const blogToLike = blogs.find((b) => b.id === blog.id)
    dispatch(voteBlog(blogToLike))
    dispatch(
      setNotification(
        `Liked blog: ${blog.title} by ${blog.author}`,
        'success',
        3
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
      dispatch(
        setNotification(
          `Removed blog: ${blog.title} by ${blog.author}`,
          'success',
          3
        )
      )
    }
  }

  return (
    <div onClick={() => setExpanded(!expanded)} className="blog">
      {!expanded && (
        <div>
          {blog.title} by {blog.author}
        </div>
      )}
      {expanded && (
        <div>
          {blog.title} by {blog.author}
          <br />
          Url: {blog.url}
          <br />
          Likes: {blog.likes}{' '}
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
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
