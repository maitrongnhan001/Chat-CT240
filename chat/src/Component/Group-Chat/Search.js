import { Component } from "react";
import ChatUser from "./ChatUser";

export default class Search extends Component {
    render() {
        return (
            <div className={this.props.StatusSreach}>
                <hr />
                <div className="chat-user">
                    <div className="container">
                        {this.props.ListUser.map((User) => {
                            return <ChatUser UserName={User.UserName}
                                PathAvatar={User.PathAvatar}
                                ID=""
                                ClickChatUser={this.props.ClickCreateRoom}
                            />
                        })}
                    </div>
                </div>
            </div>
        );
    }
}