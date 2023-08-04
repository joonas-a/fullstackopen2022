import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState("")
  const [blogAuthor, setBlogAuthor] = useState("")
  const [blogUrl, setBlogUrl] = useState("")
  const [blogLikes, setBlogLikes] = useState("")
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("currentlyLoggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("currentlyLoggedUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      setErrorMessage(null)
      setMessage("Logged in!")
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setUser(null)
      setUsername("")
      setErrorMessage("Invalid username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem("currentlyLoggedUser")
    setUser(null)
    setMessage("Logged out succesfully")
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: blogLikes,
    }
    blogService.createNew(newBlog)
    setMessage(`Added a new blog: ${blogTitle} by ${blogAuthor}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const mainView = () => (
    <div>
      Logged in as {user.username}
      <button onClick={logOut}>Log out</button>
      <form onSubmit={handleNewBlog}>
        <h3>Add a new blog</h3>
        <div>
          Title:
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={blogUrl}
            name="Url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <div>
          Likes:
          <input
            type="text"
            value={blogLikes}
            name="Likes"
            onChange={({ target }) => setBlogLikes(target.value)}
          />
        </div>
        <button type="submit">Add new blog</button>
      </form>
      <h3>Current blogs</h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return (
    <div>
      <h1>Blog App</h1>
      <Notification message={message} errorMessage={errorMessage} />
      {!user ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        mainView()
      )}
    </div>
  )
}

export default App
