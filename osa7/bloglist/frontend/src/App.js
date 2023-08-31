import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reloadBlogs } from './reducers/blogReducer'
import { initializeUser, logOut } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(reloadBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [])

  const handleLogOut = () => {
    dispatch(logOut())
  }

  const matchUser = useMatch('/users/:id')
  const selectedUser = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const selectedBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

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
                <p key={blog.id} className="blog">
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </p>
              ))}
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={selectedUser} />} />
        <Route path="/blogs/:id" element={<Blog blog={selectedBlog} />} />
      </Routes>
    </div>
  )
}

export default App
