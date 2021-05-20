const Chat = require('../models/Chat.js');
const User = require('../models/User.js');
const RoomChat = require('../models/RoomChat.js');
let count = 0;
module.exports = (Socket) => {
    //join all room
    let IdData;
    Socket.on('Client-join-room', Data => {
        IdData = Data;
        console.log(Data);
        Data.forEach( element => {
            Socket.join(element);
        });
    });
    //listening client send message
    Socket.on("Client-send-data", Data => {
        Socket.to(Data.Id).emit('Server-send-data', Data);
    });
}