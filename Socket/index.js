import {Server} from "socket.io"

const io = new Server(8888 , {
    cors : {
        origin : "http://localhost:3000",
    },
})

let users = [];//store current online users - {userId, socketId}

const addUser = (userId , socketId) =>{
    !users.some((user) => user.userId === userId) &&
    users.push({userId, socketId});
}

const removeUser = (socketId) =>{
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (recieverId) =>{
    return users.find((user) => user.userId === recieverId);
}

io.on("connection", (socket) =>{

    // when connected
    console.log('a user connected')
    // io.emit("welcome","This is socket server here... 👋")

    // take userId and SocketId from client
    socket.on("addUser" , (userId) =>{
        addUser(userId , socket.id);
        io.emit("getUsers" , users);
    })

    // when disconnected
    socket.on("disconnect", () =>{
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUsers" , users);
    })


    // send and get Messages -- Personal 
    socket.on("sendMessage" , ({senderId , recieverId , text}) =>{
        const user = getUser(recieverId);
        io.to(user.socketId).emit("getMessage" , {
            senderId,
            text
        })
    })

})