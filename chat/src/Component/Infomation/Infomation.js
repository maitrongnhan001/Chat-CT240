import {Component} from "react";
import Manager from "./Manager.js";
import Header from "./Header.js";

export default class infomation extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <div className = "information">
                <Header UserChat = {this.props.UserChat}/>
                <Manager Manage = {this.props.Manage}
                        Link = {this.props.Link}
                />
            </div>
        );
    }
}