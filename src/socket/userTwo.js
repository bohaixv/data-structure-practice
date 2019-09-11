const { makeConnection } = require('./client')

const socket = makeConnection('userTwo')

setInterval(() => {
  socket.write(JSON.stringify({
    type: 'postMessage',
    targetId: 'userOne',
    message: '你好啊 来自userTwo'
  }))
}, 3000)