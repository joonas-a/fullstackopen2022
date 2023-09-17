import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { Box, TextField, Button } from '@mui/material'
import { setNotification } from '../reducers/notificationReducer'

const CommentForm = ({ blog }) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, content))
    dispatch(setNotification(`Added comment ${content}`, 'success', 5))
    setContent('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        type="text"
        value={content}
        multiline
        minRows={3}
        onChange={(event) => setContent(event.target.value)}
      />
      <Button variant="outlined" sx={{ mt: 1, ml: 1 }} type="submit">
        Comment
      </Button>
    </Box>
  )
}

export default CommentForm
