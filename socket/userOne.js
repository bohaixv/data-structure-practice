const { makeConnection } = require('./client')

const socket = makeConnection('userOne')

setInterval(() => {
  socket.write(JSON.stringify({
    type: 'postMessage',
    targetId: 'userTwo',
    message: '你好啊 来自一名不愿意透露姓名的网友'
  }))
}, 3000)