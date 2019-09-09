const client = require('net').Socket()

function makeConnection (userId) {
  client.connect(8888, '127.0.0.1', function () {
    client.write(JSON.stringify({
      type: 'registe',
      userId
    }))
    console.log('我发出了连接')
  })

  client.on('data', function (data) {
    const msg = JSON.parse(data)
    if (msg === 'system') {
      console.log('系统消息：', msg.message)
    } else {
      console.log(msg.message)
    }
  })

  return client
}

module.exports = {
  makeConnection
}