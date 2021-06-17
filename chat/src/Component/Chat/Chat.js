import { Component } from "react";
import MyChat from "./MyChat";
import UserChat from "./UserChat";
import "./CSS/Chat.scss";

export default class Chat extends Component {
    constructor(props) {
        super(props);
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        return (
            <div className="chat">
                {this.props.Contents.map((Content) => {
                    if (this.props.Me.MyName != Content.UserName && Content.UserName != "") {
                        let PathAvatar = "";
                        //take info user
                        this.props.user.forEach((UserInfor) => {
                            if (UserInfor.UserName === Content.UserName) {
                                PathAvatar = UserInfor.PathAvatar;
                            }
                        });
                        if (PathAvatar === "") {
                            return null;
                        }
                        return <UserChat PathAvatar={PathAvatar}
                            Content={Content} />
                    } else {
                        if (Content.UserName != "") {
                            return <MyChat PathAvatar={this.props.Me.PathAvatar}
                                Content={Content} />
                        }
                    }
                })}
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }
}