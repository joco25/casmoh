let socket = io()

socket.on('connect', function () {
    console.log('connected to server')
    socket.emit('createMsg',{
        from:'lance',
        text:'whats up homie'
    })
})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newMsg',function(msg){
    console.log('new message',msg)
})