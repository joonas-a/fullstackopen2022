import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { voteBlog, removeBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material'
import Comments from './Comments'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [dialogStatus, setDialogStatus] = useState(false)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  // console.log('current blog:', blog)

  const handleClickOpen = () => {
    setDialogStatus(true)
  }

  const handleClose = () => {
    setDialogStatus(false)
  }

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
    event.preventDefault()
    setDialogStatus(false)
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

  if (!blog) {
    return null
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {blog.title} by {blog.author}
        </Typography>
        <Typography>{blog.url}</Typography>
        <Typography>{blog.likes} Likes</Typography>
        <Typography>
          Added by: {blog.user.name ? blog.user.name : user.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="success"
          id="like-button"
          onClick={(event) => handleLike(event)}
        >
          Like
        </Button>
        {user.username === blog.user.username && (
          <>
            <Button
              color="error"
              variant="outlined"
              className="deleteButton"
              onClick={handleClickOpen}
            >
              Delete
            </Button>
            <Dialog open={dialogStatus} onClose={handleClose}>
              <DialogTitle id="alertDialogTitle">{`Delete ${blog.title} by ${blog.author}?`}</DialogTitle>
              <DialogActions>
                <Button color="info" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleRemoval}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </CardActions>
      <Comments blog={blog} />
    </Card>
  )
}

export default Blog
