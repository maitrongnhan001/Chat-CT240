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
    //click button add group
    ClickAddGroup = (ListUserAddGroup) => {
        ListUserAddGroup.push(this.props.UserChat.UserName);
        let ID;
        this.props.ListChat.forEach((Element) => {
            if(Element.UserName === this.props.UserChat.UserName){
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
    //click exit
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
                    ClickAddGroup={this.ClickAddGroup}
                />
            </div>
        );
    }
}