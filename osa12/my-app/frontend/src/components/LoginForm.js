import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'
import { Box, TextField, Button } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logIn({ username, password }))
    setPassword('')
  }

  return (
    <div>
      <h4>Log in to use the app</h4>
      <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
        <TextField
          label="username"
          required
          autoFocus
          sx={{ mr: 1 }}
          id="username"
          size="small"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          label="password"
          id="password"
          required
          size="small"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          id="login-button"
          sx={{ mt: 2 }}
        >
          login
        </Button>
      </Box>
    </div>
  )
}

export default LoginForm
