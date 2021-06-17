import { Component } from "react";
import axios from "axios";
import socket from "../Socket.IO/Socket.js";
import "./CSS/Header.scss";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StatusFriend: "",
            statusOnline: "",
            statusUpdateOnline: true
        }
    }
    //update status friend for information
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.StatusFriend === "Add Friend") {
            return {
                StatusFriend: "stranger"
            }
        }
        switch (nextProps.StatusFriend) {
            case "Add Friend":
                return {
                    StatusFriend: "Stranger"
                }
                break;
            case "Delete Friend":
                return {
                    StatusFriend: "Friend"
                }
                break;
            case "":
                return {
                    StatusFriend: ""
                }
                break;
        }
        return null;
    }
    //update status online
    componentDidUpdate(prevProps, prevState, snapshot) {
        //when have the new props
        if (this.props.UserChat.UserName !== prevProps.UserChat.UserName) {
            const Data = this.props.UserChat.UserName;
            axios.post('/api/statusOnline', { UserName: Data })
                .then(Response => {
                    if (Response.data !== "") {
                        this.setState({
                            statusOnline: "online",
                            statusUpdateOnline: false
                        });
                    } else {
                        this.setState({
                            statusOnline: "",
                            statusUpdateOnline: false
                        })
                    }
                })
                .catch(Error => { });
        }
        //when orther user disconnect
        socket.on("Server-send-online", Data => {
            this.setState({
                statusOnline: "online",
                statusUpdateOnline: false
            });
        });
        socket.on("Server-send-not-online", Data => {
            this.setState({
                statusOnline: "",
                statusUpdateOnline: false
            });
        });
    }
    render() {
        return (
            <div className="header-information">
                <div className="center">
                    <img className="avatar" src={this.props.UserChat.PathAvatar}></img>
                    <div class={this.state.statusOnline}></div>
                </div>
                <p>{this.props.UserChat.UserName}</p>
                <div className="friend">{this.state.StatusFriend}</div>
            </div>
        );
    }
}