import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog, reloadBlogs } from '../reducers/blogReducer'
import Togglable from '../components/Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const createNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes,
    }

    dispatch(createBlog(blogObject))
    blogFormRef.current.toggleVisibility()
    dispatch(reloadBlogs())
    dispatch(
      setNotification(
        `Added a new blog: ${blogObject.title} by ${blogObject.author}`,
        'success',
        5
      )
    )

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
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
    </Togglable>
  )
}

export default BlogForm
