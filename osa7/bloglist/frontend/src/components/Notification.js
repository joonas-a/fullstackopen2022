import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.type === 'error') {
    return <div className="error">{notification.message}</div>
  } else if (notification.type === 'success') {
    return <div className="success">{notification.message}</div>
  } else {
    return null
  }
}

export default Notification
