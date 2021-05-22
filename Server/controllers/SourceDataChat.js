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
        ChatData.reverse();
        for (IndexData in ChatData) {
            let HandleID;
            let HandleUserName;
            ChatData[IndexData].ListUser.forEach(element => {
                if (element.UserName == req.session.UserName) {
                    //Get list chat content
                    if (ChatData[IndexData].ListUser.lenght > 2) {
                        HandleID = 'G' + ChatData[IndexData]._id;
                        //check user name
                        HandleUserName = HandleID;
                    } else {
                        HandleID = 'U' + ChatData[IndexData]._id;
                        //check user name
                        ChatData[IndexData].ListUser.forEach(ValueUser => {
                            if (ValueUser.UserName != req.session.UserName) {
                                HandleUserName = ValueUser.UserName;
                            }
                        });
                    }
                    ListChatContent.push({
                        ID: HandleID,
                        Chat: ChatData[IndexData].ContentChat
                    });
                }
            });
            //get list chat
            ChatData[IndexData].ListUser.forEach(ValueUser => {
                if (ValueUser.UserName != req.session.UserName) {
                    ListChat.push({
                        ID: HandleID,
                        UserName: HandleUserName
                    });
                }
            });
        }
        //xap xep ListChatContent theo thoi gian

        //xap xep ListChat theo thoi gian
        
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
                ListChat.forEach(ValueUser2 => {
                    if (ValueUser1.UserName == ValueUser2.UserName ||
                        ValueUser1.UserName == req.session.UserName) {
                        found = false;
                    }
                });
                if (found) {
                    user.push({
                        UserName: ValueUser1.UserName,
                        PathAvatar: ValueUser1.PathAvatar
                    });
                }
            });
            User.findOne({
                UserName: req.session.UserName
            }, (error, UserData1) => {
                Me = {
                    MyName: UserData1.UserName,
                    PathAvatar: UserData1.PathAvatar
                };
                const Data = {
                    Me, user, ListChat, ListChatContent
                }
                res.json({
                    Me, user, ListChat, ListChatContent
                })
            });
        });
    });

    // res.json({
    //     Name: 'Tran Thi Diem Em'
    // });
}