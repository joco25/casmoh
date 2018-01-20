let socket = io()

socket.on('connect', function () {
    console.log('connected to server')
    socket.emit('createEmail',{
        to: 'john@lodx.com'
        
    })
})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newEmail',function(email){
    console.log('new email',email)
})