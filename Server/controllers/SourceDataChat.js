const User = require('../models/User.js');
const Chat = require('../models/Chat.js');
const RoomChat = require('../models/RoomChat.js')

module.exports = (req, res) => {
    //find all chat
    let Me = {};
    let user = [];
    let ListChat = [];
    let ListChatContent = [];
    //find all chat
    Chat.find({}, (errorChat, ChatData) => {
        //find user chat
        //dao nguoc
        ChatData.reverse();
        for (IndexData in ChatData) {
            let HandleID;
            let HandleUserName;
            ChatData[IndexData].ListUser.forEach(element => {
                if (element.UserName == req.session.UserName) {
                    //Get list chat content
                    if (ChatData[IndexData].ListUser.length > 2) {
                        HandleID = 'G' + ChatData[IndexData]._id;
                        //check user name
                        HandleUserName = HandleID;
                        //set data
                        ListChatContent.push({
                            ID: HandleID,
                            Chat: ChatData[IndexData].ContentChat,
                            PathAvatar: "./img/Account/Group.png"
                        });
                    } else {
                        HandleID = 'U' + ChatData[IndexData]._id;
                        //check user name
                        ChatData[IndexData].ListUser.forEach(ValueUser => {
                            if (ValueUser.UserName != req.session.UserName) {
                                HandleUserName = ValueUser.UserName;
                            }
                        });
                        //set data
                        ListChatContent.push({
                            ID: HandleID,
                            Chat: ChatData[IndexData].ContentChat
                        });
                    }
                }
            });
            //set ListChat
            let i;
            //if it is group, then create UserName for it
            for (i in ChatData[IndexData].ListUser) {
                if (ChatData[IndexData].ListUser[i].UserName != req.session.UserName) {
                    if (ChatData[IndexData].ListUser.length > 2) {
                        ListChat.push({
                            ID: HandleID,
                            UserName: HandleUserName,
                            PathAvatar: "./img/Account/Group.png"
                        });
                        break;
                    } else {
                        ListChat.push({
                            ID: HandleID,
                            UserName: HandleUserName
                        });
                    }
                }
            }
        }
        //because list have elements empty then need delete it
        for(let index = 0; index < ListChat.length; index++) {
            if(ListChat[index].ID === undefined) {
                ListChat.splice(index, 1);
                index --;
            }
        }
        //Sort array ListChatContent and ListChat by time
        //dung sap xep noi bot
        // let i,j;
        for (i = 0; i < ListChatContent.length; i++) {
            for (j = i; j < ListChatContent.length; j++) {
                //create new time
                const tI = new Date(ListChatContent[i].Chat[ListChatContent[i].Chat.length - 1].Time);
                const tJ = new Date(ListChatContent[j].Chat[ListChatContent[j].Chat.length - 1].Time);
                //compare two date
                if (tI.getTime() < tJ.getTime()) {
                    //if time i < time j => then swap ListChatContent i and ListChatContent j
                    //and ListChat
                    //swap ListChatContent
                    let ListChatContentTemp = ListChatContent[i];
                    ListChatContent[i] = ListChatContent[j];
                    ListChatContent[j] = ListChatContentTemp;
                    //swap ListChat
                    let ListChatTemp = ListChat[i];
                    ListChat[i] = ListChat[j];
                    ListChat[j] = ListChatTemp;
                }
            }
        }
        //get all user
        User.find({}, (errorUser, UserData) => {
            //get user chated
            ListChat.forEach(ValueUser1 => {
                UserData.forEach(ValueUser2 => {
                    if (ValueUser2.UserName == ValueUser1.UserName) {
                        user.push({
                            UserName: ValueUser2.UserName,
                            PathAvatar: ValueUser2.PathAvatar
                        });
                    }
                });
            });
            //get user will chat
            UserData.forEach(ValueUser1 => {
                let found = true;
                //find order user not chat and order me
                ListChat.forEach(ValueUser2 => {
                    if (ValueUser1.UserName == ValueUser2.UserName ||
                        ValueUser1.UserName == req.session.UserName) {
                        found = false;
                    }
                });
                //if true then set data to user
                if (found) {
                    user.push({
                        UserName: ValueUser1.UserName,
                        PathAvatar: ValueUser1.PathAvatar
                    });
                }
            });
            //find information of me
            User.findOne({
                UserName: req.session.UserName
            }, (error, UserData1) => {
                Me = {
                    MyName: UserData1.UserName,
                    PathAvatar: UserData1.PathAvatar
                };
                //set all data
                const Data = {
                    Me, user, ListChat, ListChatContent
                }
                //return for client
                res.json({
                    Me, user, ListChat, ListChatContent
                })
            });
        });
    });
}