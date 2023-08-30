import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reloadBlogs } from './reducers/blogReducer'
import { initializeUser, logOut } from './reducers/userReducer'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(reloadBlogs())
    dispatch(initializeUser())
  }, [])

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div>
      <h1>Blog App</h1>
      <Notification />

      {!user && <LoginForm />}
      {user && (
        <div>
          Logged in as {user.username}
          <button id="logout-button" onClick={handleLogOut}>
            Log out
          </button>
          <br />
          <BlogForm />
          <h3>Current blogs</h3>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
