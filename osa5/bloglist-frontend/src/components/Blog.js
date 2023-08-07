import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleBlogLike, handleBlogRemoval }) => {
  const [expanded, setExpanded] = useState(false)

  const handleLike = (event) => {
    event.stopPropagation()
    handleBlogLike(blog)
  }

  const handleRemoval = (event) => {
    event.stopPropagation()
    handleBlogRemoval(blog)
  }

  const userInfo = JSON.parse(
    window.localStorage.getItem('currentlyLoggedUser')
  )

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
          <button onClick={(event) => handleLike(event)}>Like</button>
          <br />
          Added by: {blog.user.name ? blog.user.name : userInfo.name}
          <br />
          {userInfo.username === blog.user.username && (
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
}

export default Blog
