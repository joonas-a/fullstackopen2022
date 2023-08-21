import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNewNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    },
  },
})

export const { setNewNotification, clearNotification } =
  notificationSlice.actions

let timerID

export const setNotification = (message, lifespan) => {
  return (dispatch) => {
    dispatch(setNewNotification(message))
    clearTimeout(timerID)
    timerID = setTimeout(() => dispatch(clearNotification()), lifespan * 1000)
  }
}

export default notificationSlice.reducer
