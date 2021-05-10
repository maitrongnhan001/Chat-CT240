import { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './App.css';
import HeaderListChat from "./Component/Group-Chat/Header.js";
import ListGroupChat from "./Component/Group-Chat/ListGroupChat";
import HeaderChat from "./Component/Chat/Header.js";
import Chat from "./Component/Chat/Chat.js";
import Input from "./Component/Chat/Input.js";
import Infomation from "./Component/Infomation/Infomation.js";
import io from "socket.io-client";

const axios = require('axios').default;;

const ENDPOINT = 'http://localhost:4000';

export default class App extends Component {
    constructor(props) {
        super(props);

        axios.post('http://localhost:4000/getData')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

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
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/chat'>
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
                    </Route>
                    <Route path='/Register'>
                        <h1>Register</h1>
                    </Route>
                    <Route path='/'>
                        <h1>home</h1>
                    </Route>
                </Switch>
            </Router>
        );
    }
}