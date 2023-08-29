import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()
    handleNewBlog({
      title: title,
      author: author,
      url: url,
      likes: likes,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <div>
      <h3>Add a new blog</h3>

      <form onSubmit={createNewBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            id="title-input"
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            id="author-input"
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            id="url-input"
          />
        </div>
        <div>
          Likes:
          <input
            type="text"
            value={likes}
            onChange={(event) => setLikes(event.target.value)}
            id="likes-input"
          />
        </div>
        <button type="submit">Add new blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}

export default BlogForm
