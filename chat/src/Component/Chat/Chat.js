import {Component} from "react";
import MyChat from "./MyChat";
import UserChat from "./UserChat";

export default class Chat extends Component {
    constructor (props) {
        super(props);
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }
      
    componentDidMount() {
        this.scrollToBottom();
    }

    componentWillUpdate() {
        this.scrollToBottom();
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }
    render () {
        return (
            <div className = "chat">
                {this.props.Contents.map((Content) => {
                    if(this.props.Me.MyName != Content.UserName && Content.UserName !=""){
                        let PathAvatar = "";
                        this.props.user.forEach((UserInfor) => {
                            if(UserInfor.UserName === Content.UserName){
                                PathAvatar = UserInfor.PathAvatar;
                            }
                        });
                        return <UserChat PathAvatar = {PathAvatar}
                            Content = {Content.Content}/>
                    }else{
                        if(Content.UserName !=""){
                            return <MyChat PathAvatar = {this.props.Me.PathAvatar}
                                    Content = {Content.Content}/>
                        }
                    }
                })}
                <span ref={(el) => { this.messagesEnd = el; }}></span>
            </div>
        );
    }
}