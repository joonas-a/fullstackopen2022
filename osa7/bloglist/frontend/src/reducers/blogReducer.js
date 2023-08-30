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
  },
})

export const { setBlogs, appendBlog, sortBlogs } = blogSlice.actions

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

export default blogSlice.reducer
