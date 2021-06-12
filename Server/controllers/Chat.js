const Chat = require('../models/Chat.js');
const Friend = require('../models/Friend.js');
const ChatImage = require('../models/ChatImage');
const StatusSeen = require('../models/StatusSeen.js');
const StatusOnline = require('../models/StatusOnline.js');
const path = require('path');
const fs = require('fs');

module.exports = (Socket) => {
    //receive information
    Socket.on("Client-send-my-information", Data => {
        Socket.join(Data);
        Socket.id = Data;
        Socket.broadcast.emit("Server-send-online", Data);
    });
    //join all room
    Socket.on('Client-join-room', Data => {
        Data.forEach(element => {
            Socket.join(element);
        });
    });
    //listening client send message
    Socket.on("Client-send-data", Data => {
        //check message is image
        if (!Data.Content.File) {
            //store message to database
            const ID = Data.Id.substr(1);
            Chat.findById(ID, (err, ChatData) => {
                ChatData.ContentChat.push({
                    UserName: Data.UserName,
                    Content: Data.Content,
                    Time: Data.Time
                });
                Chat.findByIdAndUpdate(ID, ChatData, error => { });
                //find list user not seen
                ChatData.ListUser.forEach((element, index) => {
                    if (element.UserName !== Data.UserName) {
                        //set status seen
                        StatusSeen.create({
                            ID: Data.Id,
                            UserName: element.UserName
                        }, (error) => { });
                    }
                });
            });
            //send to user
            Socket.to(Data.Id).emit('Server-send-data', {
                Id: Data.Id,
                UserName: Data.UserName,
                Content: Data.Content,
                Time: Data.Time,
                StatusSeen: Data.Id
            });
        } else {
            const ID = Data.Id.substr(1);
            let image = Data.Content.File;
            //store image of chat
            fs.writeFile(path.resolve(__dirname, '../public/images/ChatImage/', Data.Content.ContentData), image, (err) => {
                if (!err) {
                    ChatImage.create({
                        ID: ID,
                        UserName: Data.UserName,
                        PathImage: '/images/ChatImage/' + Data.Content.ContentData,
                        Time: Data.Time
                    }, (error, ChatData) => {
                        if (!error) {
                            const data = {
                                Id: Data.Id,
                                UserName: ChatData.UserName,
                                PathImage: ChatData.PathImage,
                                Time: ChatData.Time
                            }
                            Socket.emit('Server-send-data', data);
                            Chat.findById(ID, (error, ChatData) => {
                                ChatData.ListUser.forEach((element, index) => {
                                    if (element.UserName !== Data.UserName) {
                                        //set status seen
                                        StatusSeen.create({
                                            ID: ID,
                                            UserName: element.UserName
                                        }, (error) => { });
                                    }
                                });
                            });
                            //send to user
                            Socket.to(Data.Id).emit('Server-send-data', {
                                Id: Data.Id,
                                UserName: ChatData.UserName,
                                PathImage: ChatData.PathImage,
                                Time: ChatData.Time,
                                StatusSeen: Data.Id
                            });
                        }
                    });
                }
            });
        }

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
            Socket.emit("Server-send-add-friend-to-me", {
                ID: ID,
                UserName: Data.UserName
            });
            Socket.join(ID);
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
        const ID = ListUser[ListUser.length - 2].UserName.slice(1);
        //check group is exist
        Chat.findById(ID, (error, ChatData) => {
            if (ChatData) {
                let NewUser = [];
                let NewListUser = ChatData.ListUser;
                for (let index = 0; index < ListUser.length - 2; index++) {
                    let check = true;
                    ChatData.ListUser.forEach(element => {
                        if (element.UserName === ListUser[index].UserName) {
                            check = false;
                        }
                    });
                    if (check) {
                        NewUser.push({
                            UserName: ListUser[index].UserName
                        });
                        NewListUser.push({
                            UserName: ListUser[index].UserName
                        });
                    }
                }
                Chat.findByIdAndUpdate(ID, {
                    ListUser: NewListUser
                }, (error, DataNewGroupChat) => {
                    if (!error) {
                        const ID = "G" + DataNewGroupChat._id;
                        NewUser.forEach(element => {
                            //loop to get each element in Data.ListUser, becase can not get from Data.ListUser
                            let ListUserGroup = [];
                            Data.ListUser.forEach((element) => {
                                ListUserGroup.push({
                                    UserName: element
                                });
                            });
                            Socket.to(element.UserName).emit("Server-send-add-group", {
                                ID,
                                ListUserGroup
                            });
                        });
                    }
                });
            } else {
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
                            Socket.to(DataNewGroupChat.ListUser[index].UserName).emit("Server-send-add-group", {
                                ID,
                                ListUserGroup
                            });
                        }
                    }
                });
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
            FriendData.ListFriend.forEach(element => {
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
                if (!error) {
                    found = true;
                } else {
                    found = false;
                }
            });
        });
        Friend.findOne({
            UserName: Data.UserName
        }, (error, FriendData) => {
            let ListFriend = [];
            FriendData.ListFriend.forEach(element => {
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
                if (!error && found) {
                    Socket.to(Data.ID).emit('Server-send-friend', {
                        Friend: !Data.Friend,
                        UserName: Data.Me
                    })
                }
            });
        });
    });
    //seen
    Socket.on("Client-send-seen", Data => {
        StatusSeen.findOneAndRemove({
            ID: Data.ID,
            UserName: Data.UserName
        }, (error) => { });
    });
   Socket.on('disconnect', () => {
       const UserName = Socket.id;
       StatusOnline.findOneAndRemove({
           UserName: UserName
       }, (error) => {
           Socket.broadcast.emit("Server-send-not-online", UserName);
       });
   })
}