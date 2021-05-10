import { Component } from "react";
import ChatUser from "./ChatUser";

export default class ListGroupChat extends Component {
    //set prop and state
    constructor(props){
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

    componentWillMount () {
        let ListUserChat_Temp = [];
        this.props.ListChat.forEach((element) => {
            try{
                if(element.ID.indexOf("G") != -1) {
                    ListUserChat_Temp.push({
                        ID: element.ID,
                        UserName: element.UserName,
                        PathAvatar: element.PathAvatar
                    });
                }else{
                    this.props.ListUser.forEach( (user) => {
                        if(user.UserName === element.UserName) {
                            ListUserChat_Temp.push({
                                ID: element.ID,
                                UserName: element.UserName,
                                PathAvatar: user.PathAvatar
                            });
                        }
                    });
                }
            }catch(e){
                ListUserChat_Temp = [];
            }
        });
        this.setState ({
            ListUserChat: ListUserChat_Temp
        })
    }

    render() {
        return (
            <div className="ListGroupChat">
                <hr />
                <div className="chat-user">
                    <div className="container">
                        {this.state.ListUserChat.map( (User) => {
                            return <ChatUser UserName = {User.UserName}
                                PathAvatar = {User.PathAvatar} 
                                ID = {User.ID}
                                ClickChatUser = {this.props.ClickChatUser}
                            />
                        })}
                    </div>
                </div>
            </div>
        );
    }
}