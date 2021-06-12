import { Component } from "react";

export default class ChatUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StatusSeen: "",
            StatusOnline: ""
        }
    }

    //click to user chat
    ClickChatUser = () => {
        if (this.props.ID !== "") {
            this.props.ClickChatUser(this.props.ID);
        } else {
            this.props.ClickChatUser(this.props.UserName);
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.StatusSeen) {
            for (let index in nextProps.StatusSeen) {
                if (nextProps.StatusSeen[index] === nextProps.ID) {
                    return {
                        StatusSeen: "bold"
                    }
                }
            };
        }
        return {
            StatusSeen: ""
        }
    }

    render() {
        return (
            <div className="row" onClick={this.ClickChatUser}>
                <div className="col-3">
                    <img className="avartar-in-list-group" src={this.props.PathAvatar} />
                </div>
                <div className="col-9">
                    <p className={this.state.StatusSeen}>{this.props.UserName}</p>
                </div>
            </div>
        );
    }
}