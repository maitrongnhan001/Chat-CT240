import { Component } from "react";
import ChatUser from "./ChatUser";

export default class ListGroupChat extends Component {
    //set prop and state
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="ListGroupChat">
                <hr />
                <div className="chat-user">
                    <div className="container">
                        
                    </div>
                </div>
            </div>
        );
    }
}