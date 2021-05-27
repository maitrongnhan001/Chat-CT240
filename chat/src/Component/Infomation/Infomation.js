import {Component} from "react";
import Manager from "./Manager.js";
import Header from "./Header.js";
import ListUserChat from "./ListUserChat.js";

export default class infomation extends Component {
    constructor(props){
        super(props)
        this.state = ({
            StatusManager: "manager-information-user",
            StatusListChatUser: "hide"
        });
    }
    //handle manager information
    ClickItemManagerInformation = (Item) => {
        switch (Item) {
            case 0 :
                this.setState({
                    StatusManager: "hide",
                    StatusListChatUser: "ListChatUser"
                });
                break;
            case 1 :
                console.log("delete chat");
                break;
            case 2 :
                console.log("logout");
                break;
        }
    }
    ExitAddGroup = () => {
        this.setState({
            StatusManager: "manager-information-user",
            StatusListChatUser: "hide"
        });
    }
    render () {
        return (
            <div className = "information">
                <Header UserChat = {this.props.UserChat}/>
                <Manager Manage = {this.props.Manage}
                        StatusManager = {this.state.StatusManager}
                        ClickItemManagerInformation = {this.ClickItemManagerInformation}
                        Link = {this.props.Link}
                />
                <ListUserChat 
                    ExitAddGroup={this.ExitAddGroup}
                    UserChat={this.props.UserChat.UserName}
                    StatusListChatUser={this.state.StatusListChatUser}
                    ListUser={this.props.ListUser}
                    ListChat={this.props.ListChat}
                />
            </div>
        );
    }
}