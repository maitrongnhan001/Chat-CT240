import { Component } from "react";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StatusFriend: ""
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.StatusFriend === "Add Friend") {
            return { StatusFriend: "stranger" }
        }
        switch (nextProps.StatusFriend) {
            case "Add Friend":
                return { StatusFriend: "Stranger" }
                break;
            case "Delete Friend":
                return { StatusFriend: "Friend" }
                break;
            case "":
                return { StatusFriend: "" }
                break;
        }
        return null;
    }
    render() {
        return (
            <div className="header-information">
                <div className="center">
                    <img className="avatar" src={this.props.UserChat.PathAvatar}></img>
                </div>
                <p>{this.props.UserChat.UserName}</p>
                <div className="friend">{this.state.StatusFriend}</div>
            </div>
        );
    }
}