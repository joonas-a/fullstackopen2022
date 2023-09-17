import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog, reloadBlogs } from '../reducers/blogReducer'
import { Box, TextField, Button } from '@mui/material'
import Togglable from '../components/Togglable'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const createNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes,
    }

    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
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

        <Box component="form" onSubmit={createNewBlog} sx={{ mt: 1 }}>
          <div>
            <TextField
              label="Title"
              size="small"
              required
              sx={{ mb: 1 }}
              fullWidth
              variant="outlined"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              id="title-input"
            />
          </div>
          <div>
            <TextField
              label="Author"
              size="small"
              sx={{ mb: 1 }}
              fullWidth
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              id="author-input"
            />
          </div>
          <div>
            <TextField
              label="URL"
              size="small"
              sx={{ mb: 1 }}
              fullWidth
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              id="url-input"
            />
          </div>
          <div>
            <TextField
              label="Likes"
              size="small"
              sx={{ mb: 1 }}
              type="number"
              value={likes}
              onChange={(event) => setLikes(event.target.value)}
              id="likes-input"
            />
            <Button
              variant="contained"
              sx={{ ml: 1, color: 'success' }}
              type="submit"
            >
              Add new blog
            </Button>
          </div>
        </Box>
      </div>
    </Togglable>
  )
}

export default BlogForm
