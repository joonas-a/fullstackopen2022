import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('currentlyLoggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logIn = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('currentlyLoggedUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(setNotification('Logged in!', 'success', 5))
      blogService.setToken(user.token)
    } catch (exception) {
      dispatch(setNotification('Wrong username or password.', 'error', 5))
    }
  }
}

export const logOut = () => {
  return (dispatch) => {
    window.localStorage.removeItem('currentlyLoggedUser')
    dispatch(clearUser())
    dispatch(setNotification('Logged out', 'success', 3))
  }
}

export default userSlice.reducer
