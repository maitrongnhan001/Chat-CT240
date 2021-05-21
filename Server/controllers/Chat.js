const Chat = require('../models/Chat.js');
const User = require('../models/User.js');
const RoomChat = require('../models/RoomChat.js');
let count = 0;
module.exports = (Socket) => {
    //join all room
    let IdData;
    Socket.on('Client-join-room', Data => {
        IdData = Data;
        Data.forEach( element => {
            Socket.join(element);
        });
    });
    //listening client send message
    Socket.on("Client-send-data", Data => {
        //store message to database
        const ID = Data.Id.substr(1);
        Chat.findById(ID, (err, ChatData) => {
            ChatData.ContentChat.push({
                UserName: Data.UserName,
                Content: Data.Content,
                Time: Data.Time
            });
            console.log(ChatData);
            Chat.findByIdAndUpdate(ID, ChatData , error => {
                console.log(error);
            });
        });
        Socket.to(Data.Id).emit('Server-send-data', Data);
    });
}