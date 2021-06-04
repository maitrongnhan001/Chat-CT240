const User = require('../models/User.js');
const Chat = require('../models/Chat.js');
const Friend = require('../models/Friend.js');
const ChatImage = require('../models/ChatImage.js');
const StatusSeen = require('../models/StatusSeen.js');

module.exports = (req, res) => {
    if (!req.session.UserName) {
        return res.json(null);
    }
    //find all chat
    let Me = {};
    let user = [];
    let ListChat = [];
    let ListChatContent = [];
    let ListStatusSeen = [];
    let ListFriend = [];
    //find all chat
    Chat.find({}, (errorChat, ChatData) => {
        //find user chat
        //get all list chat image
        ChatImage.find({}, (error, ChatImageData) => {
            if (error) {
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
                for (let index = 0; index < ListChat.length; index++) {
                    if (ListChat[index].ID === undefined) {
                        ListChat.splice(index, 1);
                        index--;
                    }
                }
                //add chat image


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
                        //find list friend
                        Friend.findOne({
                            UserName: req.session.UserName
                        }, (error, FriendData) => {
                            if (FriendData) {
                                ListFriend = FriendData.ListFriend;
                            }
                            //find data statusSeen
                            StatusSeen.find({
                                UserName: req.session.UserName
                            }, (error, StatusSeenData) => {
                                StatusSeenData.forEach(element => {
                                    ListStatusSeen.push(element.ID);
                                });
                                //return for client
                                res.json({
                                    Me, user, ListChat, ListChatContent, ListFriend, ListStatusSeen
                                });
                            });
                        });
                    });
                });
            } else {
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
                for (let index = 0; index < ListChat.length; index++) {
                    if (ListChat[index].ID === undefined) {
                        ListChat.splice(index, 1);
                        index--;
                    }
                }
                //add chat image
                ListChatContent.forEach((element, index) => {
                    //set ID
                    const ID = element.ID.substr(1);
                    let Chat = [];
                    for (let i in element.Chat) {
                        Chat.push(element.Chat[i]);
                    }
                    ChatImageData.forEach((elementChatImage, index) => {
                        if (ID === elementChatImage.ID) {
                            Chat.push({
                                UserName: elementChatImage.UserName,
                                PathImage: elementChatImage.PathImage,
                                Time: elementChatImage.Time
                            });
                        }
                    });
                    //sort chat by time
                    let i, j;
                    for (i = 1; i < Chat.length; i++) {
                        for (j = i; j < Chat.length; j++) {
                            //create new time
                            const tI = new Date(Chat[i].Time);
                            const tJ = new Date(Chat[j].Time);
                            //compare
                            if (tI.getTime() > tJ.getTime()) {
                                const temp = Chat[i];
                                Chat[i] = Chat[j];
                                Chat[j] = temp;
                            }
                        }
                    }
                    //set again ListChatContent
                    ListChatContent[index].Chat = Chat;
                });
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
                        //find list friend
                        Friend.findOne({
                            UserName: req.session.UserName
                        }, (error, FriendData) => {
                            if (FriendData) {
                                ListFriend = FriendData.ListFriend;
                            }
                            //find data statusSeen
                            StatusSeen.find({
                                UserName: req.session.UserName
                            }, (error, StatusSeenData) => {
                                StatusSeenData.forEach(element => {
                                    ListStatusSeen.push(element.ID);
                                });
                                //return for client
                                res.json({
                                    Me, user, ListChat, ListChatContent, ListFriend, ListStatusSeen
                                });
                            });
                        });
                    });
                });
            }
        });
    });
}