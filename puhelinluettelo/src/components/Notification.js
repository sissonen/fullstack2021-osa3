import React from 'react'

const Notification = (message) => {
  const infoStyle = {
    color: 'green',
    padding: 15,
    border: '3px solid green',
    borderRadius: 5
  }
  const errorStyle = {
    color: 'red',
    padding: 15,
    border: '3px solid red',
    borderRadius: 5
  }

  if (message.message === null) {
    return null
  }
  let level = message.message.level
  let msg = message.message.msg

  let style = infoStyle
  if (level === 'error') {
    style = errorStyle
  }
  
  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification
