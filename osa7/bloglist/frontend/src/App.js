import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { reloadBlogs } from './reducers/blogReducer'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('currentlyLoggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(reloadBlogs())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('currentlyLoggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification('Logged in!', 'success', 5))
    } catch (exception) {
      setUser(null)
      setUsername('')
      dispatch(setNotification('Wrong username or password.', 'error', 5))
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('currentlyLoggedUser')
    setUser(null)
    dispatch(setNotification('Logged out', 'success', 3))
  }

  const handleBlogLike = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    await blogService.addLike(blog.id, updatedBlog)
    dispatch(reloadBlogs())
    dispatch(
      setNotification(
        `Liked blog: ${blog.title} by ${blog.author}`,
        'success',
        3
      )
    )
  }

  const handleBlogRemoval = async (blog) => {
    const confirmation = window.confirm(
      `Delete ${blog.title} by ${blog.author}?`
    )
    if (confirmation) {
      await blogService.removeBlog(blog)

      dispatch(reloadBlogs())
      dispatch(
        setNotification(
          `Removed blog: ${blog.title} by ${blog.author}`,
          'success',
          3
        )
      )
    }
  }

  return (
    <div>
      <h1>Blog App</h1>
      <Notification />

      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {user && (
        <div>
          Logged in as {user.username}
          <button id="logout-button" onClick={logOut}>
            Log out
          </button>
          <br />
          <BlogForm />
          <h3>Current blogs</h3>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleBlogLike={handleBlogLike}
              handleBlogRemoval={handleBlogRemoval}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
