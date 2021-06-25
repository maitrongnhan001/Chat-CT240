import { Component } from "react";
import axios from 'axios';
import Manager from "./Manager.js";
import Header from "./Header.js";
import ListUserChat from "./ListUserChat.js";
//simport  "./CSS/ResponsiveInformation.scss";

export default class infomation extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            ID: "",
            StatusManager: "manager-information-user",
            StatusListChatUser: "hide",
            ListUser: [],
            StatusListUser: true
        });
    }
    //handle manager information
    ClickItemManagerInformation = (Item) => {
        const FirstElementID = this.props.ID[0];
        switch (Item) {
            case 0:
                this.setState({
                    StatusManager: "hide",
                    StatusListChatUser: "ListChatUser",
                    StatusListUser: true
                });
                break;
            case 1:
                if (FirstElementID === 'U') {
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
                console.log("Media");
                break;
            case 3:
                //case click member
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
    //when change props
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.UserChat.UserName[0] === "G") {
            if (nextProps.ID !== prevState.ID) {
                return {
                    ID: nextProps.ID,
                    StatusListUser: true
                };
            } else {
                return null;
            }
        }
        if (nextProps.ID !== prevState.ID) {
            return {
                ID: nextProps.ID,
                StatusListUser: true
            };
        }
        return null;
    }
    render() {
        return (
            <div className="information">
                <Header UserChat={this.props.UserChat}
                />
                <Manager
                    ID={this.props.ID}
                    StatusManager={this.state.StatusManager}
                    ClickItemManagerInformation={this.ClickItemManagerInformation}
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