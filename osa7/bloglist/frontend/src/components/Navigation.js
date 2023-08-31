import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  const bgStyle = {
    backgroundColor: '#e8e8e8',
    overflow: 'hidden',
  }

  return (
    <div style={bgStyle}>
      <Link to={'/'}>Home</Link> <Link to={'/users'}>Users</Link>
      {user && (
        <div>
          Logged in as {user.username}{' '}
          <button id="logout-button" onClick={handleLogOut}>
            Log out
          </button>{' '}
        </div>
      )}
    </div>
  )
}

export default Navigation
