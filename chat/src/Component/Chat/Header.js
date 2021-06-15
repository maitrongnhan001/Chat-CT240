import { Component } from "react";
import socket from "../Socket.IO/Socket.js";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusOnline: "",
            statusUpdateOnline: true,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.statusOnline !== prevState.statusOnline) {
            console.log('loii');
            if(prevState.statusUpdateOnline) {
                return {
                    statusOnline: nextProps.statusOnline,
                    statusUpdateOnline: true
                }
            }else{
                return {
                    statusUpdateOnline: true
                }
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        socket.on("Server-send-online", Data => {
            console.log("online");
            this.setState({
                statusOnline: "online",
                statusUpdateOnline: false
            });
        });
        socket.on("Server-send-not-online", Data => {
            console.log("not online");
            this.setState({
                statusOnline: "",
                statusUpdateOnline: false
            });
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