import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    clearUsers() {
      return []
    },
  },
})

export const { setUsers, clearUsers } = usersSlice.actions

export const initalizeUsers = () => {
  return async (dispatch) => {
    const allUsers = await userService.getAll()
    console.log(allUsers)
    dispatch(setUsers(allUsers))
  }
}

export default usersSlice.reducer
