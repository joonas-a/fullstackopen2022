const Notification = ({ notification }: { notification: string }) => {
  const style = {
    color: '#FF0000',
  };

  if (!notification) {
    return <></>;
  }
  return <h3 style={style}>{notification}</h3>;
};

export default Notification;
