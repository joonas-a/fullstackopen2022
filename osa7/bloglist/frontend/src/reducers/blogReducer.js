import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    sortBlogs(state) {
      return state.sort((a, b) => b.likes - a.likes)
    },
    reloadWithout(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, sortBlogs, reloadWithout } =
  blogSlice.actions

export const reloadBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
    dispatch(sortBlogs())
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(content)
    dispatch(appendBlog(newBlog))
  }
}

export const voteBlog = (id) => {
  return async (dispatch) => {
    const updatedBlogs = await blogService.addLike(id)
    dispatch(setBlogs(updatedBlogs))
    dispatch(sortBlogs())
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.removeBlog(blog)
    dispatch(reloadWithout(blog.id))
    dispatch(sortBlogs())
  }
}

export default blogSlice.reducer
