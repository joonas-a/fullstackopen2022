import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addLike = async (blog) => {
  const blogUrl = `${baseUrl}/${blog.id}`
  const config = {
    headers: { Authorization: token },
  }
  const newBlog = {
    ...blog,
    likes: blog.likes + 1,
  }

  await axios.put(blogUrl, newBlog, config)
  return getAll()
}

const removeBlog = async (blog) => {
  const blogUrl = `${baseUrl}/${blog.id}`
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(blogUrl, config)
  return
}

export default { setToken, getAll, createNew, addLike, removeBlog }
