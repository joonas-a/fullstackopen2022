import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setSuccessNotification(state, action) {
      return {
        message: action.payload,
        type: 'success',
      }
    },
    setErrorNotification(state, action) {
      return {
        message: action.payload,
        type: 'error',
      }
    },
    clearNotification() {
      return initialState
    },
  },
})

export const {
  setSuccessNotification,
  setErrorNotification,
  clearNotification,
} = notificationSlice.actions

let timerID

export const setNotification = (message, type, lifespan) => {
  if (type === 'success') {
    return (dispatch) => {
      dispatch(setSuccessNotification(message))
      clearTimeout(timerID)
      timerID = setTimeout(() => dispatch(clearNotification()), lifespan * 1000)
    }
  } else {
    return (dispatch) => {
      dispatch(setErrorNotification(message))
      clearTimeout(timerID)
      timerID = setTimeout(() => dispatch(clearNotification()), lifespan * 1000)
    }
  }
}

export default notificationSlice.reducer
