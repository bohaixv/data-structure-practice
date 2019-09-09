const net = require('net')

const users = {}

net.createServer(function (socket) {
  console.log('server has run')
  // console.log(socket)

  socket.write(JSON.stringify({
    type: 'system',
    message: '没错你就是已经连接上我了'
  }))

  socket.on('data', function (data) {
    const msg = JSON.parse(data)
    if (msg.type === 'registe') {
      users[msg.userId] = socket
    } else if (msg.type === 'postMessage') {
      if (users[msg.targetId]) {
        users[msg.targetId].write(JSON.stringify({
          type: 'postMessage',
          message: msg.message
        }))
      } else {
        socket.write(JSON.stringify({
          type: 'postMessage',
          message: '太不巧了，对方不在线阿'
        }))
      }
    }
  })
}).listen(8888, function () {
  console.log('tcp server listen 8888')
})