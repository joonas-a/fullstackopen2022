const Notification = ({ message, errorMessage }) => {
  if (errorMessage) {
    return <div className="error">{errorMessage}</div>
  } else if (message) {
    return <div className="success">{message}</div>
  } else {
    return null
  }
}

export default Notification
