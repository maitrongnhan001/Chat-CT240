import { Component } from "react";
import axios from 'axios';

import HeaderListChat from "./Group-Chat/Header.js";
import ListGroupChat from "./Group-Chat/ListGroupChat";
import HeaderChat from "./Chat/Header.js";
import Chat from "./Chat/Chat.js";
import Input from "./Chat/Input.js";
import Infomation from "./Infomation/Infomation.js";
import io from "socket.io-client";
const ENDPOINT = 'http://localhost:4000';

const socket = io.connect(ENDPOINT, {
    "force new connection": true,
    "reconnectionAttempts": "Infinity",
    "timeout": 10000,
    "transports": ["websocket"]
});

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
                    PathAvatar: String
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
            ManageItems: [
                "Add Group",
                "Delete Chat",
            ],
            LinkItems: [
                "/",
                "/"
            ]
        }
    }
    //check manager information
    checkManage = (UserChatInformation) => {
        if (UserChatInformation.indexOf("G") != -1) {
            this.setState({
                ManageItems: [
                    "Add User",
                    "Out Group",
                ],
                LinkItems: [
                    "/",
                    "/"
                ]
            });
        } else {
            this.setState({
                ManageItems: [
                    "Add Group",
                    "Delete Chat",
                ],
                LinkItems: [
                    "/",
                    "/"
                ]
            });
        }
    }
    //click from list user
    ClickChatUser = (UserChatInformation) => {
        //content chat
        var chatContent = [];
        //user chat (1 user)
        var user = {};
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
            IdData: UserChatInformation
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
        //Find elemet of ListChatContent by IdData
        let index;
        for (index = 0; index < StateListChatContent.length; index++) {
            if (StateListChatContent[index].ID === this.state.IdData) {
                StateListChatContent[index].Chat.push(ChatData);
                //swap element listChatContent
                let i, temp;
                temp = StateListChatContent[index];
                for(i = index; i < StateListChatContent.length - 1; i++) {
                    StateListChatContent[i] = StateListChatContent[i + 1]; 
                }
                //xoa phan tu cuoi
                StateListChatContent.pop();
                //chuyen len dau
                StateListChatContent.unshift(temp);
                //swap element listChat
                temp = ListChat[index];
                for(i = index; i < ListChat.length - 1; i++) {
                    ListChat[i] = ListChat[i + 1];
                }
                //xoa phan tu cuoi
                ListChat.pop()
                //chuyen len dau
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
        socket.emit('Client-send-data', ChatData);
    }

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
            IdData: Id
        });
    }

    componentDidMount() {
        axios.get('/api/sourceDataChat')
            .then(Response => {
                this.setState({
                    Me: Response.data.Me,
                    user: Response.data.user,
                    ListChat: Response.data.ListChat,
                    ListChatContent: Response.data.ListChatContent
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillUpdate(prevProps, prevState, snapshot) {
        if (this.state.ListChatContent !== prevState.ListChatContent) {
            socket.on('Server-send-data', Data => {
                //set data
                const ServerChatData = {
                    UserName: Data.UserName,
                    Content: Data.Content,
                    Time: Data.Time
                };
                //get list chat content
                let ListChatContent = this.state.ListChatContent;
                let index;
                for (index in ListChatContent) {
                    if (ListChatContent[index].ID === Data.Id) {
                        console.log(ServerChatData);
                        ListChatContent[index].Chat.push(ServerChatData);
                        break;
                    }
                }
                this.setState({
                    ListChatContent: ListChatContent
                });
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.Me !== prevState.Me) {
            //when first render componnet then set state: UserChat and Contents
            //after switch the first data to component chat
            let UserChatData, ContentsData, Id;
            UserChatData = this.state.user[0];
            ContentsData = this.state.ListChatContent[0].Chat;
            Id = this.state.ListChatContent[0].ID;
            this.setState({
                UserChat: UserChatData,
                Contents: ContentsData,
                IdData: Id
            });
            //take list id to join room
            let ListId = [];
            this.state.ListChatContent.forEach(element => {
                ListId.push(element.ID);
            });
            //request join room chat
            socket.emit('Client-join-room', ListId);
        }
    }

    render() {
        return (
            <div className="App">
                <div className="chat-app-container-col-1">
                    <HeaderListChat MyData={this.state.Me.PathAvatar} />
                    <ListGroupChat ListUser={this.state.user}
                        ClickChatUser={this.ClickChatUser}
                        ListChat={this.state.ListChat}
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
                    <Infomation UserChat={this.state.UserChat}
                        Manage={this.state.ManageItems}
                        Link={this.state.LinkItems}
                    />
                </div>
            </div>
        );
    }
}