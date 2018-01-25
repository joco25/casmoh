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
    let formatedTime = moment(message.createdAt).format('h:mm a')

    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });

    $('#messages').append(html);

})

socket.on('newLocationMessage',function(message){
    let formatedTime = moment(message.createdAt).format('h:mm a')
    
    let template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        url: message.url,
        createdAt: formatedTime,
        from: message.from
    }) 
    
    $('#messages').append(html)
})

$('#message-form').on('submit',function (e){
    e.preventDefault();
    let messageTextBox = $('[name=message]');
    socket.emit('createMessage',{
        from:'User',
        text: messageTextBox.val()
    },function(){
        messageTextBox.val('')
    })
})

const locationButton= $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser')
    }

    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location')
    })
})