import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reloadBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Navigation from './components/Navigation'
import MainView from './components/MainView'

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
      <Navigation />
      <Notification />
      <br />
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={selectedUser} />} />
        <Route path="/blogs/:id" element={<Blog blog={selectedBlog} />} />
      </Routes>
    </div>
  )
}

export default App
