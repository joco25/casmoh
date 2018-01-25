const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server= http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("new user connected")

    socket.emit('welcome',{
        from:'Admin',
        text:'Welcome to chat App',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newUser',{
        from:'Admin',
        text:'New user Joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
        
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()    
        });

        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on('disconnect', () => {
        console.log("client disconnected")
    })
});


// app.get('/',(req,res)=>{
//     res.send('ok')
// })

server.listen(port,()=>{
    console.log(`started on port ${port}`);
})