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
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
})

$('#message-form').on('submit',function (e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text: $('[name=message]').val()
    },function(){

    })
})

const locationButton= $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },function(){
        alert('Unable to fetch location')
    })
})