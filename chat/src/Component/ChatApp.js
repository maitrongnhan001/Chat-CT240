import { Component } from "react";
import axios from 'axios';

import HeaderListChat from "./Group-Chat/Header.js";
import ListGroupChat from "./Group-Chat/ListGroupChat";
import Search from "./Group-Chat/Search.js"
import HeaderChat from "./Chat/Header.js";
import Chat from "./Chat/Chat.js";
import Input from "./Chat/Input.js";
import Infomation from "./Infomation/Infomation.js";
import socket from "./Socket.IO/Socket.js";
import { Socket } from "net";

export default class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Me: {
                MyName: String,
                PathAvatar: String
            },
            user: [
                {
                    UserName: String,
                    PathAvatar: String,
                    statusOnline: false
                },
            ],
            ListChat: [
                {
                    ID: String,
                    UserName: String
                },
            ],
            ListChatContent: [
                {
                    ID: String,
                    Chat: [
                        {
                            _id: String,
                            UserName: String,
                            Content: String,
                            Time: new Date()
                        },
                    ]
                }
            ],
            IdData: "12345",
            StatusSeen: [],
            ListFriend: [],
            //state manage information
            ManageItems: [],
            //state hide and show sreach
            StatusListGroupChat: "ListGroupChat",
            StatusSearch: "hide",
            //state result search
            Result: [
                {
                    UserName: String,
                    PathAvatar: String
                }
            ],
            checkSearch: true,
            CheckShowGroup: false
        }
    }
    //check manager information
    checkManage = (UserChatInformation) => {
        if (UserChatInformation.indexOf("G") != -1) {
            this.setState({
                ManageItems: [
                    "Add User",
                    "Out Group",
                    "Member"
                ]
            });
        } else {
            if (UserChatInformation.indexOf("U") != -1) {
                this.setState({
                    ManageItems: [
                        "Add Group",
                        "Delete Chat",
                    ]
                });
            }
        }
    }
    //click from list user
    ClickChatUser = (UserChatInformation) => {
        //content chat
        var chatContent = [];
        //user chat (1 user)
        var user = {};
        let StatusSeen = this.state.StatusSeen;
        for(let index in StatusSeen) {
            if(StatusSeen[index] === UserChatInformation) {
                StatusSeen.splice(index, 1);
            }
        }
        socket.emit("Client-send-seen", {
            UserName: this.state.Me.MyName,
            ID: UserChatInformation
        });
        //find the chat content
        this.state.ListChatContent.forEach((UserChat) => {
            if (UserChat.ID === UserChatInformation) {
                chatContent = UserChat.Chat;
            }
        });
        //find name and img of chat
        this.state.ListChat.forEach((UserChatInfo) => {
            if (UserChatInfo.ID === UserChatInformation) {
                user = UserChatInfo;
                this.state.user.forEach((UserInfo) => {
                    if (UserInfo.UserName === UserChatInfo.UserName) {
                        user = UserInfo;
                    }
                })
            }
        });
        this.setState({
            UserChat: user,
            Contents: chatContent,
            IdData: UserChatInformation,
            CheckShowGroup: false,
            StatusSeen: StatusSeen
        });
        this.checkManage(UserChatInformation);
    }

    //send message
    HandleContentChat = (ContentData) => {
        let TimeData = new Date();
        //set data
        const ChatData = {
            Id: this.state.IdData,
            UserName: this.state.Me.MyName,
            Content: ContentData,
            Time: TimeData.getTime()
        };
        //get ListChatContent
        let StateListChatContent = this.state.ListChatContent;
        let ListChat = this.state.ListChat;
        if (!ContentData.File) {
            //Find elemet of ListChatContent by IdData
            let index;
            for (index = 0; index < StateListChatContent.length; index++) {
                if (StateListChatContent[index].ID === this.state.IdData) {
                    StateListChatContent[index].Chat.push(ChatData);
                    //swap element listChatContent
                    let temp = StateListChatContent[index];
                    StateListChatContent.splice(index, 1);
                    StateListChatContent.unshift(temp);

                    temp = ListChat[index];
                    ListChat.splice(index, 1);
                    ListChat.unshift(temp);
                    break;
                }
            }
            //set state
            this.setState({
                ListChat: ListChat,
                ListChatContent: StateListChatContent
            });
            //send message to server
        }
        socket.emit('Client-send-data', ChatData);
    }

    //handle search
    InputSreachClick = (check) => {
        if (check) {
            this.setState({
                StatusListGroupChat: "hide",
                StatusSearch: "ListGroupChat",
            });
        } else {
            this.setState({
                StatusListGroupChat: "ListGroupChat",
                StatusSearch: "hide",
            });
        }
        if (check) {
            this.setState({
                checkSearch: check
            });
        }
    }

    //handle input search
    HandleInputSearch = (InputSearch) => {
        //array list user
        let ArrayUser = this.state.user;
        //array list result search
        let result = [];
        //check
        let count = 0;
        //convert from string InputSearch to Array value
        let value = Array.from(InputSearch);
        //loop each element in array list user
        ArrayUser.forEach((ElementUser, IndexUser) => {
            //loop each element in string value
            value.forEach((ElementKey, IndexKey) => {
                if (ElementUser.UserName.indexOf(ElementKey) != -1) {
                    count++;
                }
            });
            //check elemet value
            if (count == value.length) {
                result.push({
                    UserName: ElementUser.UserName,
                    PathAvatar: ElementUser.PathAvatar
                });
            }
            count = 0;
        });
        //set result to state
        this.setState({
            Result: result
        });
    }

    //click create room
    ClickCreateRoom = (ValueUserName) => {
        //clear layout search
        this.setState({
            checkSearch: false
        });
        //this.InputSreachClick(this.state.checkSearch);
        //set data
        const Data = {
            UserName: ValueUserName,
            Me: this.state.Me.MyName
        }
        //client have data
        let ListUser = this.state.ListChat;
        let found = true;
        ListUser.forEach((element) => {
            if (element.UserName === Data.UserName) {
                this.ClickChatUser(element.ID);
                found = false;
            }
        });
        //check ListChatContent of user is exit?
        if (found) {
            socket.emit("Client-add-friend", Data);
        }
    }
    //click create room for list user group
    ClickCreateRoomInGroup = (ValueUserName) => {
        //set data
        const Data = {
            UserName: ValueUserName,
            Me: this.state.Me.MyName
        }
        //client have data
        let ListUser = this.state.ListChat;
        let found = true;
        ListUser.forEach((element) => {
            if (element.UserName === Data.UserName) {
                this.ClickChatUser(element.ID);
                found = false;
            }
        });
        //check ListChatContent of user is exit?
        if (found) {
            socket.emit("Client-add-friend", Data);
            socket.on("Server-send-add-friend-to-me", IdChat => {
                //set state userChat for new user
                ListUser.push({
                    ID: IdChat,
                    UserName: Data.UserName
                });
                //set state ListChatContent for new user
                let ListChatContent = this.state.ListChatContent;
                ListChatContent.push({
                    ID: IdChat,
                    Chat: []
                });
                this.setState({
                    ListChat: ListUser,
                    ListChatContent: ListChatContent
                });
                this.ClickChatUser(IdChat);
            });
        }
    }
    //click add group
    ClickAddGroup = (DataUserAddGroup) => {
        //add me to ListUserAddGroup
        DataUserAddGroup.ListUser.push(this.state.Me.MyName);
        socket.emit("Client-send-add-group", DataUserAddGroup);
    }
    //Click delete chat and out group
    ClickDeleteChat = (check) => {
        let ListChat = this.state.ListChat;
        let ListChatContent = this.state.ListChatContent;
        for (let index in ListChat) {
            if (ListChat[index].ID === this.state.IdData) {
                ListChat.splice(index, 1);
                ListChatContent.splice(index, 1);
                break;
            }
        }
        if (check === 1) {
            //Click delete chat
            socket.emit("Client-send-delete-chat", this.state.IdData);
        } else {
            //Click out group
            socket.emit("Client-send-out-group", {
                ID: this.state.IdData,
                UserName: this.state.Me.MyName
            });
        }
        this.setState({
            ListChat: ListChat,
            ListChatContent: ListChatContent
        });
        try {
            this.ClickChatUser(ListChat[0].ID);
        }catch (e) {}
    }
    //add friend
    AddFriend = (UserName) => {
        let ListFriend = this.state.ListFriend;
        const Data = {
            ID: this.state.IdData,
            Me: this.state.Me.MyName,
            Friend: false,
            UserName: UserName
        }
        socket.emit("Client-send-friend", Data);
        ListFriend.push({ UserName: UserName });
        this.setState({
            ListFriend: ListFriend
        });
    }
    //delete friend
    DeleteFriend = (UserName) => {
        let ListFriend = this.state.ListFriend;
        for (let index in ListFriend) {
            if (ListFriend[index].UserName === UserName) {
                ListFriend.splice(index, 1);
                break;
            }
        }
        const Data = {
            ID: this.state.IdData,
            Me: this.state.Me.MyName,
            Friend: true,
            UserName: UserName
        }
        socket.emit("Client-send-friend", Data);
        this.setState({
            ListFriend: ListFriend
        });
    }
    //click show list group
    ClickShowListGroup = () => {
        if (!this.state.CheckShowGroup) {
            this.setState({
                CheckShowGroup: true
            });
        }
    }
    //life component
    componentWillMount() {
        //when first render componnet then set state: UserChat and Contents
        //after switch the first data to component chat
        let UserChatData, ContentsData, Id;
        UserChatData = this.state.user[0];
        ContentsData = this.state.ListChatContent[0].Chat;
        Id = this.state.ListChatContent[0].ID;
        this.setState({
            UserChat: UserChatData,
            Contents: ContentsData,
            IdData: Id,
            Result: []
        });
    }

    componentDidMount() {
        axios.get('/api/sourceDataChat')
            .then(Response => {
                this.setState({
                    Me: Response.data.Me,
                    user: Response.data.user,
                    ListChat: Response.data.ListChat,
                    ListChatContent: Response.data.ListChatContent,
                    ListFriend: Response.data.ListFriend,
                    StatusSeen: Response.data.ListStatusSeen
                });
                //check data
                this.props.CheckData(Response.data.ListChat, 
                    Response.data.user);
                //send my information to server
                socket.emit("Client-send-my-information", Response.data.Me.MyName);
            })
            .catch(error => {
            });
    }

    componentWillUpdate(prevProps, prevState, snapshot) {
        if (this.state.ListChatContent !== prevState.ListChatContent) {
            socket.on('Server-send-data', Data => {
                if (Data.PathImage) {
                    const ServerChatData = {
                        UserName: Data.UserName,
                        PathImage: Data.PathImage,
                        Time: Data.Time
                    };
                    //get list chat content
                    let StatusSeen = this.state.StatusSeen;
                    let ListChatContent = this.state.ListChatContent;
                    let ListChat = this.state.ListChat;
                    let index;
                    for (index in ListChatContent) {
                        if (ListChatContent[index].ID === Data.Id) {
                            ListChatContent[index].Chat.push(ServerChatData);
                            //swap element listChatContent
                            let temp = ListChatContent[index];
                            ListChatContent.splice(index, 1);
                            ListChatContent.unshift(temp);
                            temp = ListChat[index];
                            ListChat.splice(index, 1);
                            ListChat.unshift(temp);
                            break;
                        }
                    }
                    StatusSeen.push(Data.StatusSeen);
                    this.setState({
                        ListChatContent: ListChatContent,
                        StatusSeen: StatusSeen
                    });
                } else {
                    //set data
                    const ServerChatData = {
                        UserName: Data.UserName,
                        Content: Data.Content,
                        Time: Data.Time
                    };
                    //get list chat content
                    let StatusSeen = this.state.StatusSeen;
                    let ListChatContent = this.state.ListChatContent;
                    let ListChat = this.state.ListChat;
                    let index;
                    for (index in ListChatContent) {
                        if (ListChatContent[index].ID === Data.Id) {
                            ListChatContent[index].Chat.push(ServerChatData);
                            //swap element listChatContent
                            let temp = ListChatContent[index];
                            ListChatContent.splice(index, 1);
                            ListChatContent.unshift(temp);

                            temp = ListChat[index];
                            ListChat.splice(index, 1);
                            ListChat.unshift(temp);
                            break;
                        }
                    }
                    StatusSeen.push(Data.StatusSeen);
                    this.setState({
                        ListChatContent: ListChatContent,
                        StatusSeen: StatusSeen
                    });
                }
            });

            socket.on("Server-send-add-friend-to-me", Data => {
                let ListUser = this.state.ListChat;
                let ListChatContent = this.state.ListChatContent;
                //set state userChat for new user
                ListUser.push({
                    ID: Data.ID,
                    UserName: Data.UserName
                });
                //set state ListChatContent for new user
                ListChatContent.push({
                    ID: Data.ID,
                    Chat: []
                });
                //if new client, then set layout
                this.props.CheckData (ListUser, 
                    this.state.user);
                //set data
                this.setState({
                    ListChat: ListUser,
                    ListChatContent: ListChatContent
                });
                this.ClickChatUser(Data.ID);
            });

            socket.on('Server-send-add-friend-to-user', Data => {
                let ListChat = this.state.ListChat;
                let ListChatContent = this.state.ListChatContent;
                ListChat.push(Data);
                ListChatContent.push({
                    ID: Data.ID,
                    Chat: []
                });
                //if new client, then set layout
                this.props.CheckData (ListChat, 
                    this.state.user);
                //set data
                this.setState({
                    ListChat: ListChat,
                    ListChatContent: ListChatContent
                });
                //request join room chat
                //join room
                let ListID = [];
                ListID.push(Data.ID);
                socket.emit('Client-join-room', ListID);
            });
            socket.on("Server-send-add-group-to-me", Data => {
                let ListChat = this.state.ListChat;
                let ListChatContent = this.state.ListChatContent;
                ListChat.push({
                    ID: Data,
                    UserName: Data,
                    PathAvatar: "./img/Account/Group.png"
                });
                ListChatContent.push({
                    ID: Data,
                    PathAvatar: "./img/Account/Group.png",
                    Chat: []
                });
                this.setState({
                    ListChat: ListChat,
                    ListChatContent: ListChatContent
                });
                //request join room chat
                //join room
                let ListID = [];
                ListID.push(Data.ID);
                socket.emit('Client-join-room', ListID);
            })
            socket.on("Server-send-add-group", Data => {
                let ListChat = this.state.ListChat;
                let ListChatContent = this.state.ListChatContent;
                ListChat.push({
                    ID: Data.ID,
                    UserName: Data.ID,
                    PathAvatar: "./img/Account/Group.png"
                });
                ListChatContent.push({
                    ID: Data.ID,
                    PathAvatar: "./img/Account/Group.png",
                    Chat: []
                });
                this.setState({
                    ListChat: ListChat,
                    ListChatContent: ListChatContent
                });
                //request join room chat
                //join room
                let ListID = [];
                ListID.push(Data.ID);
                socket.emit('Client-join-room', ListID);
            });
            //listent event delete chat
            socket.on("Server-send-delete-chat", IdData => {
                let ListChat = this.state.ListChat;
                let ListChatContent = this.state.ListChatContent;
                for (let index in ListChat) {
                    if (ListChat[index].ID === IdData) {
                        ListChat.splice(index, 1);
                        ListChatContent.splice(index, 1);
                        break;
                    }
                }
                this.setState({
                    ListChat: ListChat,
                    ListChatContent: ListChatContent
                });
                try {
                    this.ClickChatUser(ListChat[0].ID);
                }catch (e) {}
            });
            //listent event out group
            socket.on("Server-send-out-group", Data => {

            });
            //listend add and delete friend
            socket.on("Server-send-friend", Data => {
                const UserName = Data.UserName;
                if (Data.Friend) {
                    let ListFriend = this.state.ListFriend;
                    ListFriend.push({ UserName: UserName });
                    this.setState({
                        ListFriend: ListFriend
                    });
                } else {
                    let ListFriend = this.state.ListFriend;
                    for (let index in ListFriend) {
                        if (ListFriend[index].UserName === UserName) {
                            ListFriend.splice(index, 1);
                            break;
                        }
                    }
                    this.setState({
                        ListFriend: ListFriend
                    });
                }
            });
            //set status online
            socket.on("Server-send-status", Data => {

            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.Me !== prevState.Me) {
            //when first render componnet then set state: UserChat and Contents
            //after switch the first data to component chat
            try {
                let UserChatData, ContentsData, Id;
                UserChatData = this.state.user[0];
                ContentsData = this.state.ListChatContent[0].Chat;
                Id = this.state.ListChatContent[0].ID;
                this.setState({
                    UserChat: UserChatData,
                    Contents: [],
                    IdData: Id
                });
                this.checkManage(Id);
            } catch (e) { }
            //take list id to join room
            let ListId = [];
            this.state.ListChatContent.forEach(element => {
                ListId.push(element.ID);
            });
            //set MyUserName in component App
            this.props.GetUserName(this.state.Me.MyName);
            //request join room chat
            socket.emit('Client-join-room', ListId);
        }
    }

    render() {
        return (
            <div className="App">
                <div className="chat-app-container-col-1">
                    <HeaderListChat
                        ClickShowListGroup={this.ClickShowListGroup}
                        check={this.state.checkSearch}
                        MyData={this.state.Me.PathAvatar}
                        InputSreachClick={this.InputSreachClick}
                        HandleInputSearch={this.HandleInputSearch}
                        ChangePassword={this.props.ChangePassword}
                        ChangeAvatar={this.props.ChangeAvatar}
                    />
                    <ListGroupChat
                        StatusSeen={this.state.StatusSeen}
                        CheckShowGroup={this.state.CheckShowGroup}
                        StatusListGroupChat={this.state.StatusListGroupChat}
                        ListUser={this.state.user}
                        ClickChatUser={this.ClickChatUser}
                        ID={this.state.IdData}
                        ListChat={this.state.ListChat}
                    />
                    <Search
                        StatusSreach={this.state.StatusSearch}
                        ListUser={this.state.Result}
                        ClickCreateRoom={this.ClickCreateRoom}
                    />
                </div>
                <div className="chat-app-container-col-2">
                    <HeaderChat
                        UserChat={this.state.UserChat}
                    />
                    <Chat Me={this.state.Me}
                        user={this.state.user}
                        UserChat={this.state.UserChat}
                        Contents={this.state.Contents}
                    />
                    <Input
                        HandleContentChat={this.HandleContentChat}
                    />
                </div>
                <div className="chat-app-container-col-3">
                    <Infomation
                        AddFriend={this.AddFriend}
                        DeleteFriend={this.DeleteFriend}
                        ListFriend={this.state.ListFriend}
                        UserChat={this.state.UserChat}
                        ID={this.state.IdData}
                        Manage={this.state.ManageItems}
                        ClickCreateRoom={this.ClickCreateRoomInGroup}
                        ListUser={this.state.user}
                        ListChat={this.state.ListChat}
                        ClickAddGroup={this.ClickAddGroup}
                        ClickDeleteChat={this.ClickDeleteChat}
                    />
                </div>
            </div>
        );
    }
}