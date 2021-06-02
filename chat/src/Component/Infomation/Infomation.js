import { Component } from "react";
import axios from 'axios';
import Manager from "./Manager.js";
import Header from "./Header.js";
import ListUserChat from "./ListUserChat.js";

export default class infomation extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            StatusManager: "manager-information-user",
            StatusListChatUser: "hide",
            StatusFriend: "",
            ListUser: [],
            StatusListUser: true
        });
    }
    //handle manager information
    ClickItemManagerInformation = (Item) => {
        switch (Item) {
            case 0:
                this.setState({
                    StatusManager: "hide",
                    StatusListChatUser: "ListChatUser"
                });
                break;
            case 1:
                if (this.props.Manage[Item] !== "Out Group") {
                    if (window.confirm("Do you want delete this chat?")) {
                        this.props.ClickDeleteChat(1);
                    }
                } else {
                    if (window.confirm("Do you want out this group?")) {
                        this.props.ClickDeleteChat(0);
                    }
                }
                break;
            case 2:
                //case add group
                if (this.props.Manage[Item] !== "Member") {
                    this.clickFriend();
                } else {
                    //case click user
                    axios.post('/api/getListUser', {
                        ID: this.props.ID
                    })
                        .then(Response => {
                            this.setState({
                                ListUser: Response.data.ListUser,
                                StatusListUser: false
                            })
                        })
                        .catch(error => { });
                    this.setState({
                        StatusManager: "hide",
                        StatusListChatUser: "ListChatUser"
                    });
                }
                break;
        }
    }
    //click button add group
    ClickAddGroup = (ListUserAddGroup) => {
        ListUserAddGroup.push(this.props.UserChat.UserName);
        let ID;
        this.props.ListChat.forEach((Element) => {
            if (Element.UserName === this.props.UserChat.UserName) {
                ID = Element.ID;
            }
        })
        let DataUserAddGroup = {
            ID: ID,
            ListUser: ListUserAddGroup
        }
        this.props.ClickAddGroup(DataUserAddGroup);
        this.ExitAddGroup();
    }
    //click chat user
    ClickChatUser = (UserName) => {
        this.props.ClickCreateRoom(UserName);
        this.ExitAddGroup();
    }
    //click exit
    ExitAddGroup = () => {
        this.setState({
            StatusManager: "manager-information-user",
            StatusListChatUser: "hide"
        });
    }
    //click friend
    clickFriend = () => {
        if (this.state.StatusFriend === "Add Friend") {
            //add friend
            this.props.AddFriend(this.props.UserChat.UserName);
        } else {
            //delete friend
            this.props.DeleteFriend(this.props.UserChat.UserName);
        }
    }
    //when change props
    static getDerivedStateFromProps(nextProps, prevState) {
        let StatusFriend = "";
        if (nextProps.UserChat.UserName[0] === "G") {
            if (StatusFriend !== prevState.StatusFriend) {
                return {
                    StatusFriend: "",
                    StatusListUser: true
                };
            } else {
                return null;
            }
        }
        StatusFriend = "Add Friend";
        nextProps.ListFriend.forEach((element) => {
            if (element.UserName === nextProps.UserChat.UserName) {
                StatusFriend = "Delete Friend";
            }
        });
        if (StatusFriend !== prevState.StatusFriend) {
            return {
                StatusFriend: StatusFriend,
                StatusListUser: true
            };
        }
        return null;
    }
    render() {
        return (
            <div className="information">
                <Header UserChat={this.props.UserChat}
                    StatusFriend={this.state.StatusFriend}
                />
                <Manager Manage={this.props.Manage}
                    StatusFriend={this.state.StatusFriend}
                    StatusManager={this.state.StatusManager}
                    ClickItemManagerInformation={this.ClickItemManagerInformation}
                    Link={this.props.Link}
                />
                <ListUserChat
                    ExitAddGroup={this.ExitAddGroup}
                    UserChat={this.props.UserChat.UserName}
                    StatusListChatUser={this.state.StatusListChatUser}
                    ListUser={this.props.ListUser}
                    ListUserGroup={this.state.ListUser}
                    StatusListUser={this.state.StatusListUser}
                    ClickCreateRoom={this.ClickChatUser}
                    ListChat={this.props.ListChat}
                    ClickAddGroup={this.ClickAddGroup}
                />
            </div>
        );
    }
}