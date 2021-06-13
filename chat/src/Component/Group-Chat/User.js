import { Component } from "react";
import socket from "../Socket.IO/Socket.js";
import axios from 'axios'

export default class User extends Component {
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
            this.props.ClickChatUser(this.props.ID, this.state.statusOnline);
        } else {
            this.props.ClickChatUser(this.props.UserName, this.state.statusOnline);
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

    componentDidMount() {
        const Data = this.props.UserName;
        axios.post('/api/statusOnline', { UserName: Data })
            .then(Response => {
                if (Response.data !== "") {
                    this.setState({
                        statusOnline: "online"
                    });
                } else {
                    this.setState({
                        statusOnline: ""
                    })
                }
            })
            .catch(Error => { });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        socket.on("Server-send-online", Data => {
            const UserName = Data;
            if(this.props.UserName === UserName) {
                this.setState({
                    statusOnline: "online"
                });
            }
        });
        socket.on("Server-send-not-online", Data => {
            const UserName  = Data;
            if(this.props.UserName === UserName) {
                this.setState({
                    statusOnline: ""
                });
            }
        });
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
                <div class={this.state.statusOnline}></div>
            </div>
        );
    }
}