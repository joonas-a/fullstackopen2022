import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createNew = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addLike = async (blogId, newBlog) => {
  const blogUrl = `${baseUrl}/${blogId}`
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(blogUrl, newBlog, config)
  return response.data
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
