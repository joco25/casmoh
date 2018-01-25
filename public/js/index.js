let socket = io()

socket.on('connect', function () {
    console.log('connected to server')
})

socket.on('welcome',function(message){
    console.log(message.text)
})

socket.on('newUser', function (message) {
    console.log(message.text)
})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newMessage', function (message){
    console.log('new message',message)
})