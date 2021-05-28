const Chat = require('../models/Chat.js');
const User = require('../models/User.js');
const RoomChat = require('../models/RoomChat.js');
const { find } = require('../models/Chat.js');

var ArrayUserOnline = [];

module.exports = (Socket) => {
    //receive information
    Socket.on("Client-send-my-information", Data => {
        Socket.join(Data);
    });
    //join all room
    Socket.on('Client-join-room', Data => {
        Data.forEach(element => {
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
            Chat.findByIdAndUpdate(ID, ChatData, error => {
            });
        });
        Socket.to(Data.Id).emit('Server-send-data', Data);
    });
    //add friend
    Socket.on("Client-add-friend", Data => {
        const ListUser = [
            { UserName: Data.UserName },
            { UserName: Data.Me }
        ];
        Chat.create({
            ListUser: ListUser,
            ContentChat: [
                {
                    UserName: "",
                    Content: "",
                    Time: new Date()
                }
            ]
        }, (error, data) => {
            const ID = "U" + data._id;
            Socket.join(ID);
            Socket.emit("Server-send-add-friend-to-me", ID);
            Socket.to(Data.UserName).emit("Server-send-add-friend-to-user", {
                ID: ID,
                UserName: Data.Me
            });
        });
    });
    //add new group
    Socket.on("Client-send-add-group", Data => {
        //create chat to database
        let ListUser = [];
        Data.ListUser.forEach((element) => {
            ListUser.push({
                UserName: element
            });
        });
        Chat.create({
            ListUser: ListUser,
            ContentChat: [
                {
                    UserName: "",
                    Content: "",
                    Time: new Date()
                }
            ]
        }, (error, DataNewGroupChat) => {
            const ID = "G" + DataNewGroupChat._id;
            Socket.join(ID);
            Socket.emit("Server-send-add-group-to-me", ID);
            let index;
            for (index in DataNewGroupChat.ListUser) {
                if (DataNewGroupChat.ListUser[index].UserName !== ListUser[ListUser.length - 1].UserName) {
                    //loop to get each element in Data.ListUser, becase can not get from Data.ListUser
                    let ListUserGroup = [];
                    Data.ListUser.forEach((element) => {
                        ListUserGroup.push({
                            UserName: element
                        });
                    });
                    ListUserGroup.splice(index, 1);
                    console.log(ListUserGroup);
                    Socket.to(DataNewGroupChat.ListUser[index].UserName).emit("Server-send-add-group", {
                        ID,
                        ListUserGroup
                    });
                }
            }
        });

    });
}