function Notification({message, isError}) {
  if (message === null || message === undefined || message === '') {
    return;
  }

  const style = {
    marginBottom: '10px',
    marginTop: '10px',
    padding: '5px',
    color: isError ? 'red' : 'green',
    backgroundColor: 'azure',
    borderStyle: 'solid',
    fontSize: '20px',
    borderColor: isError ? 'red' : 'green',
    borderRadius: '8px',
  };

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification;