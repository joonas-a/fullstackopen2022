import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('currentlyLoggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    reloadBlogs()
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
      setErrorMessage(null)
      setMessage('Logged in!')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setUser(null)
      setUsername('')
      setErrorMessage('Invalid username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('currentlyLoggedUser')
    setUser(null)
    setMessage('Logged out succesfully')
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const reloadBlogs = async () => {
    // load blogs sorted descending by likes
    let blogsToSort = await blogService.getAll()
    blogsToSort.sort(
      (firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes
    )
    setBlogs(blogsToSort)
  }

  const handleNewBlog = async (blogObject) => {
    const newBlog = await blogService.createNew(blogObject)
    blogFormRef.current.toggleVisibility()
    reloadBlogs()
    setMessage(`Added a new blog: ${newBlog.title} by ${newBlog.author}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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
    reloadBlogs()
    setMessage(`Liked blog: ${blog.title} by ${blog.author}`)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleBlogRemoval = async (blog) => {
    const confirmation = window.confirm(
      `Delete ${blog.title} by ${blog.author}?`
    )
    if (confirmation) {
      await blogService.removeBlog(blog)

      reloadBlogs()
      setMessage(`Removed blog: ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <h1>Blog App</h1>
      <Notification message={message} errorMessage={errorMessage} />

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
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm handleNewBlog={handleNewBlog} />
          </Togglable>
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
