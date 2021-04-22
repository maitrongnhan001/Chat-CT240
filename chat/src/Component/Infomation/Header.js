import {Component} from "react";

export default class Header extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div className = "header-information">
                <div className = "center">
                    <img className = "avatar" src = {this.props.UserChat.PathAvatar}></img>
                </div>
                <p>{this.props.UserChat.UserName}</p>
                <hr/>
            </div>
        );
    }
}