import { Component } from "react";

export default class Header extends Component {
    constructor (props) {
        super(props);
    }
    render() {
        return (
            <div className="header-chat">
                <div className="container">
                    <div className="row">
                        <div className="col-1">
                            <img className="avatar" src= {this.props.UserChat.PathAvatar}></img>
                        </div>
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