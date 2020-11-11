const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const users = [];

app.use(express.static(__dirname + '/public')); // express.static(__dirname + '/public') - месторасположение статических файлов
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html')
});

io.on('connection', (socket) => {
      socket.on('login', (data) => {

        const found = users.find((user) => {
            return user === data
        })
        if(!found){
           users.push(data);
            console.log('users', users)

           socket.nickname = data;
           io.emit('login', {status: 'Ok'});
           io.emit('users', {users})
        }else{
            io.emit('login', {status: 'Err'})
        }
    });

    socket.on('message', (data) => {
        console.log(data)
        io.emit('new_message', {
            message: data,
            time: new Date(),
            nickname: socket.nickname
        })
    });

    socket.on('disconnect', data => {
        users.map((user, index) => {
            console.log('index', index)
            if(user === socket.nickname){
                users.splice(index - 1, 1)
            }
        })

        io.emit('users', {users})
    })
});


server.listen(4000, () => {
    console.log('port 4000')
});
