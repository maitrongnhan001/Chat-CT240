import { Component } from "react";
import axios from "axios";
import socket from "../Socket.IO/Socket.js";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusOnline: ""
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.statusOnline !== prevState.statusOnline) {
            return {
                statusOnline: nextProps.statusOnline
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        socket.on("Server-send-online", Data => {
            const UserName = Data;
            if (this.props.UserChat.UserName === UserName) {
                this.setState({
                    statusOnline: "online"
                });
            }
        });
        socket.on("Server-send-not-online", Data => {
            const UserName = Data;
            if (this.props.UserChat.UserName === UserName) {
                this.setState({
                    statusOnline: ""
                });
            }
        });
    }

    render() {
        return (
            <div className="header-chat">
                <div className="container">
                    <div className="row">
                        <div className="col-1">
                            <img className="avatar" src={this.props.UserChat.PathAvatar}></img>
                        </div>
                        <div class={this.state.statusOnline}></div>
                        <div className="col-9">
                            <p>
                                <h3>{this.props.UserChat.UserName}</h3>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}