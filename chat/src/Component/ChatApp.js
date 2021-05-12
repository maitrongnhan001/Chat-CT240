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

export default class ChatApp extends Component {
    constructor(props) {
        super(props);
        alert(this.props.MyUserName);
        this.state = {
            Me: {
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
            Contents: chatContent
        });
        this.checkManage(UserChatInformation);
    }

    componentWillMount() {
        //when first render componnet then set state: UserChat and Contents
        //after switch the first data to component chat
        let UserChatData, ContentsData;
        UserChatData = this.state.user[0];
        ContentsData = this.state.ListChatContent[0].Chat;
        this.setState({
            UserChat: UserChatData,
            Contents: ContentsData
        })
    }

    componentDidMount() {
        const socket = io.connect(ENDPOINT, {
            "force new connection": true,
            "reconnectionAttempts": "Infinity",
            "timeout": 10000,
            "transports": ["websocket"]
        });

        axios.post('/api/sourceDataChat')
                .then(Response => {
                    console.log(Response);
                })
                .catch(error => {
                    console.log('loi');
                })
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
                    <Input />
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