import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reloadBlogs } from './reducers/blogReducer'
import { initializeUser, logOut } from './reducers/userReducer'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Users from './components/Users'

import { Routes, Route } from 'react-router-dom'

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

  if (!user) {
    return (
      <div>
        <h1>Blog App</h1>
        <p>Log in to use the app</p>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h1>Blog App</h1>
      <Notification />
      Logged in as {user.username}
      <button id="logout-button" onClick={handleLogOut}>
        Log out
      </button>
      <br />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <BlogForm />
              <h3>Current blogs</h3>
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
