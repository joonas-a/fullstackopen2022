import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import {
  ThemeProvider,
  createTheme,
  Toolbar,
  AppBar,
  Button,
  Box,
} from '@mui/material'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#cccccc',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Button color="primary" component={Link} to="/">
            Home
          </Button>
          <Button color="primary" component={Link} to="/users">
            Users
          </Button>
          {user && (
            <Box sx={{ ml: 2, mr: 2 }}>
              Logged in as {user.username}
              <Button id="logout-button" onClick={handleLogOut}>
                Log out
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Navigation
