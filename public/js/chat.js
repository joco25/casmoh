let socket = io()

function scrollToBottom(){
    //selectors
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');

    //heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop= messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop >=scrollHeight){
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', function () {
    var params = $.deparam(window.location.search);

    socket.emit('join',params,function(err){
        if(err){
            alert(err)
            window.location.href = '/'
        }else{
            console.log('No error')
        }
    })
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

socket.on('updateUserList',function(users){
    let ol = $('<ol></ol>')

    users.forEach(function (user){
        ol.append($('<li></li>').text(user))
    })

    $('#users').html(ol)
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
    scrollToBottom();
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
    scrollToBottom();
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