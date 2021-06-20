import { Component } from "react";
import socket from "../Socket.IO/Socket.js";
import "./CSS/Header.scss";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusOnline: "",
            statusUpdateOnline: true,
        }
    }

    //update status online when change props
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.statusOnline !== prevState.statusOnline) {
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
    //when orther user disconnect
    componentDidUpdate(prevProps, prevState, snapshot) {
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
            <div className="header-chat">
                <div className="container">
                    <div className="row">
                        <div className="custom-col-1">
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