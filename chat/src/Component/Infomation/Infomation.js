import {Component} from "react";
import Manage from "./Manager.js";
import Header from "./Header.js";

export default class infomation extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <div className = "information">
                <Header UserChat = {this.props.UserChat}/>
                <Manage />
            </div>
        );
    }
}