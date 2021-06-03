import { Component } from "react";
import ChatUser from "./ChatUser";

export default class ListGroupChat extends Component {
    //set prop and state
    constructor(props) {
        super(props);
        this.state = {
            ListUserChat: [
                {
                    ID: String,
                    UserName: String,
                    PathAvatar: String
                }
            ]
        }

    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.CheckShowGroup) {
            let ListUserChat_Temp = [];
            nextProps.ListChat.forEach((element) => {
                try {
                    if (element.ID.indexOf("G") != -1) {
                        ListUserChat_Temp.push({
                            ID: element.ID,
                            UserName: element.UserName,
                            PathAvatar: element.PathAvatar
                        });
                    } 
                } catch (e) { }
            });
            if (ListUserChat_Temp !== prevState.ListUserChat) {
                return { ListUserChat: ListUserChat_Temp };
            }
            return null;
        } else {
            let ListUserChat_Temp = [];
            nextProps.ListChat.forEach((element) => {
                try {
                    if (element.ID.indexOf("G") != -1) {
                        ListUserChat_Temp.push({
                            ID: element.ID,
                            UserName: element.UserName,
                            PathAvatar: element.PathAvatar
                        });
                    } else {
                        nextProps.ListUser.forEach((user) => {
                            if (user.UserName === element.UserName) {
                                ListUserChat_Temp.push({
                                    ID: element.ID,
                                    UserName: element.UserName,
                                    PathAvatar: user.PathAvatar
                                });
                            }
                        });
                    }
                } catch (e) { }
            });
            if (ListUserChat_Temp !== prevState.ListUserChat) {
                return { ListUserChat: ListUserChat_Temp };
            }
            return null;
        }
    }

    render() {
        return (
            <div className={this.props.StatusListGroupChat}>
                <hr />
                <div className="chat-user">
                    <div className="container">
                        {this.state.ListUserChat.map((User) => {
                            return <ChatUser UserName={User.UserName}
                                PathAvatar={User.PathAvatar}
                                ID={User.ID}
                                ClickChatUser={this.props.ClickChatUser}
                                StatusSeen={this.props.StatusSeen}
                            />
                        })}
                    </div>
                </div>
            </div>
        );
    }
}