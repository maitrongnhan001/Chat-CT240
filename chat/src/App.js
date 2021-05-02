import { Component } from "react";

import './App.css';
import HeaderListChat from "./Component/Group-Chat/Header.js";
import ListGroupChat from "./Component/Group-Chat/ListGroupChat";
import HeaderChat from "./Component/Chat/Header.js";
import Chat from "./Component/Chat/Chat.js";
import Input from "./Component/Chat/Input.js";
import Infomation from "./Component/Infomation/Infomation.js";

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            Me: {
                MyName : "Trong Nhan",
                PathAvatar: "./img/Account/11.jpg"
            },
            user: [
                {
                    UserName: "Trong Nhan 1",
                    PathAvatar: "./img/Account/1.jpg"
                },
                {
                    UserName: "Trong Nhan 2",
                    PathAvatar: "./img/Account/6.jpg"
                },
                {
                    UserName: "Trong Nhan 3",
                    PathAvatar: "./img/Account/7.jpg"
                },
                {
                    UserName: "user 1",
                    PathAvatar: "./img/Account/2.jpg"
                },
                {
                    UserName: "user 2",
                    PathAvatar: "./img/Account/3.jpg"
                },
                {
                    UserName: "user 3",
                    PathAvatar: "./img/Account/4.jpg"
                },
                {
                    UserName: "user 4",
                    PathAvatar: "./img/Account/5.jpg"
                },
                {
                    UserName: "user 5",
                    PathAvatar: "./img/Account/8.jpg"
                },
                {
                    UserName: "user 6",
                    PathAvatar: "./img/Account/9.jpg"
                },
                {
                    UserName: "user 7",
                    PathAvatar: "./img/Account/8.jpg"
                },
                {
                    UserName: "user 8",
                    PathAvatar: "./img/Account/9.jpg"
                },
                {
                    UserName: "user 9",
                    PathAvatar: "./img/Account/9.jpg"
                }
            ],
            ListChat: [
                {
                    ID: "U111",
                    UserName: "Trong Nhan 1"
                },
                {
                    ID: "U112",
                    UserName: "Trong Nhan 2"
                },
                {
                    ID: "G113",
                    UserName: "Group G123",
                    PathAvatar: "./img/Account/Group.png"
                },
                {
                    ID: "U113",
                    UserName: "user 3"
                },
                {
                    ID: "U114",
                    UserName: "user 4"
                },
                {
                    ID: "U115",
                    UserName: "user 5"
                },
                {
                    ID: "U116",
                    UserName: "user 6"
                },
                {
                    ID: "U117",
                    UserName: "user 7"
                },
                {
                    ID: "U118",
                    UserName: "user 8"
                },
                {
                    ID: "U119",
                    UserName: "user 9"
                }
            ],
            ListChatContent: [
                {
                    ID: "U111",
                    Chat: [
                        {
                            UserName: "Trong Nhan 1",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,1)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,2)
                        },
                        {
                            UserName: "Trong Nhan 1",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,3)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,4)
                        },
                        {
                            UserName: "Trong Nhan 1",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,5)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello ewf ewdf",
                            Time: new Date(2021,1,1,1,6)
                        },
                        {
                            UserName: "Trong Nhan 1",
                            Content: "Hello fewdf ewd",
                            Time: new Date(2021,1,1,1,7)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello fdfdsf",
                            Time: new Date(2021,1,1,1,8)
                        },
                        {
                            UserName: "Trong Nhan 1",
                            Content: "Hello fqffq s",
                            Time: new Date(2021,1,1,1,1)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello sda fqsfa fq f",
                            Time: new Date(2021,1,1,1,2)
                        },
                        {
                            UserName: "Trong Nhan 1",
                            Content: "Hello 2e213",
                            Time: new Date(2021,1,1,1,3)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,4)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hellllllllllllllllllllu",
                            Time: new Date(2021,1,1,1,5)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "dai ban goi chim se",
                            Time: new Date(2021,1,1,1,6)
                        },
                        {
                            UserName: "Trong Nhan 1",
                            Content: "chim se goi dai ban",
                            Time: new Date(2021,1,1,1,7)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "alo 123445566",
                            Time: new Date(2021,1,1,1,8)
                        }
                    ]
                },
                {
                    ID: "U112",
                    Chat: [
                        {
                            UserName: "Trong Nhan 2",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,1)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,2)
                        },
                        {
                            UserName: "Trong Nhan 2",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,3)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,4)
                        },
                        {
                            UserName: "Trong Nhan 2",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,5)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,6)
                        },
                        {
                            UserName: "Trong Nhan 2",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,7)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,8)
                        },
                    ]
                },
                {
                    ID: "G113",
                    PathAvatar: "./img/Account/Group.png",
                    Chat: [
                        {
                            UserName: "Trong Nhan 1",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,1)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,2)
                        },
                        {
                            UserName: "Trong Nhan 2",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,3)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,4)
                        },
                        {
                            UserName: "Trong Nhan 3",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,5)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,6)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,7)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,8)
                        },
                    ]
                },
                {
                    ID: "U113",
                    Chat: [
                        {
                            UserName: "user 3",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,1)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,2)
                        },
                        {
                            UserName: "user 3",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,3)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,4)
                        },
                        {
                            UserName: "user 3",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,5)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,6)
                        },
                        {
                            UserName: "user 3",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,7)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,8)
                        },
                    ]
                },
                {
                    ID: "U114",
                    Chat: [
                        {
                            UserName: "user 4",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,1)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,2)
                        },
                        {
                            UserName: "user 4",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,3)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,4)
                        },
                        {
                            UserName: "user 4",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,5)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,6)
                        },
                        {
                            UserName: "user 4",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,7)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,8)
                        },
                    ]
                },
                {
                    ID: "U115",
                    Chat: [
                        {
                            UserName: "user 5",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,1)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,2)
                        },
                        {
                            UserName: "user 5",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,3)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,4)
                        },
                        {
                            UserName: "user 5",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,5)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,6)
                        },
                        {
                            UserName: "user 5",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,7)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,8)
                        },
                    ]
                },
                {
                    ID: "U116",
                    Chat: [
                        {
                            UserName: "user 6",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,1)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,2)
                        },
                        {
                            UserName: "user 6",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,3)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,4)
                        },
                        {
                            UserName: "user 6",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,5)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,6)
                        },
                        {
                            UserName: "user 6",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,7)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,8)
                        },
                    ]
                },
                {
                    ID: "U117",
                    Chat: [
                        {
                            UserName: "user 7",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,1)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,2)
                        },
                        {
                            UserName: "user 7",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,3)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,4)
                        },
                        {
                            UserName: "user 7",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,5)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,6)
                        },
                        {
                            UserName: "user 7",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,7)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,8)
                        },
                    ]
                },
                {
                    ID: "U118",
                    Chat: [
                        {
                            UserName: "user 8",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,1)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,2)
                        },
                        {
                            UserName: "user 8",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,3)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,4)
                        },
                        {
                            UserName: "user 8",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,5)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,6)
                        },
                        {
                            UserName: "user 8",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,7)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,8)
                        },
                    ]
                },
                {
                    ID: "U119",
                    Chat: [
                        {
                            UserName: "user 9",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,1)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,2)
                        },
                        {
                            UserName: "user 9",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,3)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,4)
                        },
                        {
                            UserName: "user 9",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,5)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,6)
                        },
                        {
                            UserName: "user 9",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,7)
                        },
                        {
                            UserName: "Trong Nhan",
                            Content: "Hello",
                            Time: new Date(2021,1,1,1,8)
                        },
                    ]
                },
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
    checkManage = (UserChatInformation) =>{
        if(UserChatInformation.indexOf("G") != -1){
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
        }else{
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
        this.state.ListChatContent.forEach( (UserChat) => {
            if(UserChat.ID === UserChatInformation){
                chatContent = UserChat.Chat;
            }
        });
        //find name and img of chat
        this.state.ListChat.forEach((UserChatInfo) => {
            if(UserChatInfo.ID === UserChatInformation) {
                user = UserChatInfo;
                this.state.user.forEach((UserInfo) => {
                    if(UserInfo.UserName === UserChatInfo.UserName){
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

    render () {
        return (
            <div className = "App">
                <div className = "chat-app-container-col-1">
                    <HeaderListChat MyData = {this.state.Me.PathAvatar}/>
                    <ListGroupChat ListUser = {this.state.user} 
                        ClickChatUser = {this.ClickChatUser}
                        ListChat = {this.state.ListChat}
                     />
                </div>
                <div className = "chat-app-container-col-2">
                    <HeaderChat
                        UserChat = {this.state.UserChat}
                    />
                    <Chat Me = {this.state.Me}
                        user = {this.state.user}
                        UserChat = {this.state.UserChat}
                        Contents = {this.state.Contents}
                    />
                    <Input />
                </div>
                <div className = "chat-app-container-col-3">
                    <Infomation  UserChat = {this.state.UserChat}
                                Manage = {this.state.ManageItems}
                                Link = {this.state.LinkItems}
                    />
                </div>
            </div>
        );
    }
}