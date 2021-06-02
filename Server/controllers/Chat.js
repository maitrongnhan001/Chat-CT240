const Chat = require('../models/Chat.js');
const User = require('../models/User.js');
const Friend = require('../models/Friend.js');
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
    //delete a chat
    Socket.on("Client-send-delete-chat", IdData => {
        const ID = IdData.slice(1);
        Chat.findByIdAndRemove(ID, (error, Data) => {
            if (!error) {
                Socket.to(IdData).emit("Server-send-delete-chat", IdData);
            }
        });
    });
    //out a group
    Socket.on("Client-send-out-group", Data => {
        const ID = Data.ID.slice(1);
        const UserName = Data.UserName;
        Chat.findById(ID, (err, ChatData) => {
            let index, ChangeChatData = ChatData;
            for (index in ChangeChatData.ListUser) {
                if (ChangeChatData.ListUser[index].UserName == UserName) {
                    ChangeChatData.ListUser.splice(index, 1);
                    break;
                }
            }
            Chat.findByIdAndUpdate(ID, ChangeChatData, (error) => {
                if (!error) {
                    Socket.to(Data.ID).emit("Server-send-out-group", {
                        Data
                    });
                }
            })
        });
    });
    //add friend
    Socket.on("Client-send-friend", Data => {
        let found = false;
        Friend.findOne({
            UserName: Data.Me
        }, (error, FriendData) => {
            let ListFriend = [];
            FriendData.ListFriend.forEach( element => {
                ListFriend.push(element);
            });
            if (!Data.Friend) {
                ListFriend.push({
                    UserName: Data.UserName
                });
            } else {
                for (let index in ListFriend) {
                    if (ListFriend[index].UserName === Data.UserName) {
                        ListFriend.splice(index, 1);
                        break;
                    }
                }
            }
            Friend.findOneAndUpdate({
                UserName: Data.Me
            }, {
                ListFriend: ListFriend
            }, (error) => {
                if(!error) {
                    found = true;
                }else{
                    found = false;
                }
            });
        });
        Friend.findOne({
            UserName: Data.UserName
        }, (error, FriendData) => {
            let ListFriend = [];
            FriendData.ListFriend.forEach( element => {
                ListFriend.push(element);
            });
            if (!Data.Friend) {
                ListFriend.push({
                    UserName: Data.Me
                });
            } else {
                for (let index in ListFriend) {
                    if (ListFriend[index].UserName === Data.Me) {
                        ListFriend.splice(index, 1);
                        break;
                    }
                }
            }
            Friend.findOneAndUpdate({
                UserName: Data.UserName
            }, {
                ListFriend: ListFriend
            }, (error) => {
                if(!error && found) {
                    Socket.to(Data.ID).emit('Server-send-friend', {
                        Friend: !Data.Friend,
                        UserName: Data.Me
                    })
                }
            });
        });
    });
}