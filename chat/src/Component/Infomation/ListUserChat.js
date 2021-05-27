import { Component } from "react";
import ChatUser from "../Group-Chat/ChatUser.js";
let count = 0;

export default class ListUserChat extends Component {
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
            ],
            ListCheckChange: []
        }
    }

    //click user chat
    ClickUserChat = (UserName) => {
        this.props.ListChat.forEach((element, index) => {
            if (element.UserName == UserName) {
                console.log(UserName);
                let ListCheckChange = this.state.ListCheckChange;
                ListCheckChange[index] = true;
                this.setState({
                    ListCheckChange: ListCheckChange
                })
            }
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let ListUserChat_Temp = [];
        nextProps.ListChat.forEach((element) => {
            try {
                if (element.UserName != nextProps.UserChat) {
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
                }
            } catch (e) { }
        });
        if (ListUserChat_Temp !== prevState.ListUserChat) {
            return {
                ListUserChat: ListUserChat_Temp,
            };
        }
        return null;
    }

    componentWillUpdate(prevProps) {

        if (this.props.ListChat.ListChat != prevProps.ListChat) {
            let ListCheckChange = [];
            this.props.ListChat.forEach(() => {
                ListCheckChange.push(false);
            });
            this.setState({
                ListCheckChange: ListCheckChange
            });
        }
    }

    render() {
        return (
            <div className={this.props.StatusListChatUser}>
                <div className="header-manager">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <div className="exit-search"
                                    onClick={() => this.props.ExitAddGroup()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="icon-exit" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="col-5">
                                <h3>Add group</h3>
                            </div>
                            <div className="col-4">
                                <button type="button" className="btn btn-success">Add Group</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat-user">
                    <div className="container">
                        {this.state.ListUserChat.map((User, index) => {
                            return <div className="row">
                                <div className="col-1">
                                    <input type="checkbox" name={User.UserName} id={User.UserName} />
                                </div>
                                <div className="col-11">
                                    <label for={User.UserName} >
                                        <ChatUser UserName={User.UserName}
                                            PathAvatar={User.PathAvatar}
                                            ID=""
                                            ClickChatUser={this.ClickUserChat}
                                        />
                                    </label>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}