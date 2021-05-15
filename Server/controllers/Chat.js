const ChatSchema = require('../models/Chat.js');
const User = require('../models/User.js');
const RoomChat = require('../models/RoomChat.js');

module.exports = (Socket) => {
    console.log("Connecting");

    Socket.on("client-send-data", Data => {
        console.log(Data);
    })

    Socket.on('disconnect', () => {
        console.log(Socket.id + 'ngat ket noi');
    })
}