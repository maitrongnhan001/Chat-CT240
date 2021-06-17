import { Component } from "react";
import ChatUser from "../Group-Chat/ChatUser.js";
import "./CSS/ListUserChat.scss";
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
            ListUserAddGroup: [],
            buttonElement: "",
            title: ""
        }
    }

    //click user chat
    ClickExit = () => { 
        this.props.ExitAddGroup()
        this.setState({
            ListUserAddGroup: []
        })
    }

    //onChange
    OnChangeCheckbox = (event) => {
        let ListUserAddGroup = this.state.ListUserAddGroup;
        if (event.target.checked) {
            ListUserAddGroup[event.target.name] = event.target.value;
        } else {
            ListUserAddGroup[event.target.name] = null;
        }
        this.setState({
            ListUserAddGroup: ListUserAddGroup
        });
    }

    //click button add group
    ClickAddGroup = () => {
        //clear element null
        let ListUserAddGroup = [];
        this.state.ListUserAddGroup.forEach((element, index) => {
            if (element !== null) {
                ListUserAddGroup.push(element)
            }
        });
        //check length is empty
        if (ListUserAddGroup.length > 0) {
            this.props.ClickAddGroup(ListUserAddGroup);
        }
        this.setState({
            ListUserAddGroup: []
        });
    }
    //ClickChatUser
    ClickChatUser = (UserName) => {
        this.props.ClickCreateRoom(UserName);
    }
    //when change props
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.StatusListUser) {
            let ListUserChat_Temp = [];
            nextProps.ListChat.forEach((element) => {
                try {
                    if (element.UserName != nextProps.UserChat) {
                        if (element.ID.indexOf("U") != -1) {
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
            const buttonElement = (<button
                type="button"
                className="btn btn-success"
            >Add Group</button>);
            if (ListUserChat_Temp !== prevState.ListUserChat) {
                return {
                    ListUserChat: ListUserChat_Temp,
                    buttonElement: buttonElement,
                    title: "Add user"
                };
            }
            return {ListUserAddGroup: []};
        } else {
            let ListUserChat_Temp = [];
            nextProps.ListUserGroup.forEach(element => {
                try {
                    nextProps.ListUser.forEach(user => {
                        if (element.UserName === user.UserName) {
                            ListUserChat_Temp.push({
                                ID: "",
                                UserName: element.UserName,
                                PathAvatar: user.PathAvatar
                            });
                        }
                    });
                } catch (e) { }
            });
            if (ListUserChat_Temp !== prevState.ListUserChat) {
                return {
                    ListUserChat: ListUserChat_Temp,
                    buttonElement: "",
                    title: "Member"
                };
            }
            return null;
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
                                    onClick={() => this.ClickExit()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="icon-exit" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="col-5">
                                <h3>Add user</h3>
                            </div>
                            <div className="col-4">
                                <span>
                                    <div onClick={() => this.ClickAddGroup()}>
                                        {
                                            this.state.buttonElement
                                        }
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat-user">
                    <div className="container">
                        {this.state.ListUserChat.map((User, index) => {
                            if (this.props.StatusListUser) {
                                return <div className="row">
                                    <div className="col-1">
                                        <input
                                            type="checkbox"
                                            name={index}
                                            value={User.UserName}
                                            id={User.UserName}
                                            onChange={this.OnChangeCheckbox}
                                            checked={this.state.ListUserAddGroup[index]}
                                        />
                                    </div>
                                    <div className="col-11">
                                        <label for={User.UserName} >
                                            <ChatUser UserName={User.UserName}
                                                PathAvatar={User.PathAvatar}
                                                ID=""
                                                ClickChatUser={() => {}}
                                            />
                                        </label>
                                    </div>
                                </div>
                            } else {
                                return <div className="row">
                                    <div className="col-11">
                                        <ChatUser UserName={User.UserName}
                                            PathAvatar={User.PathAvatar}
                                            ID=""
                                            ClickChatUser={this.ClickChatUser}
                                        />
                                    </div>
                                </div>
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}