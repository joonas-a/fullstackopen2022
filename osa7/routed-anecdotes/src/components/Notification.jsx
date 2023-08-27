const Notification = ({ message }) => {
  const style = {
    border: 'groove',
    padding: 10,
    marginTop: 5,
    borderWidth: 2,
  }

  if (message !== '') {
    return <div style={style}>{message}</div>
  }
  return
}

export default Notification
