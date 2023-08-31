import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.type === 'error') {
    return (
      <Alert sx={{ mt: 1 }} severity="error">
        {notification.message}
      </Alert>
    )
  } else if (notification.type === 'success') {
    return (
      <Alert sx={{ mt: 1 }} severity="success">
        {notification.message}
      </Alert>
    )
  } else {
    return null
  }
}

export default Notification
