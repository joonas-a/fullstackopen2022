import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleBlogLike, handleBlogRemoval, user }) => {
  const [expanded, setExpanded] = useState(false)

  const handleLike = (event) => {
    event.stopPropagation()
    handleBlogLike(blog)
  }

  const handleRemoval = (event) => {
    event.stopPropagation()
    handleBlogRemoval(blog)
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
  handleBlogLike: PropTypes.func.isRequired,
  handleBlogRemoval: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
