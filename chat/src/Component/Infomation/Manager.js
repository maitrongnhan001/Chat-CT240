import {Component} from "react";

export default class Manager extends Component {
    render () {
        return (
            <div className = "manager-information-user">
                <ul>
                    <li>
                        <a href = "/">Add Group</a>
                    </li>
                    <hr />
                    <li>
                        <a href = "/">Delete Chat</a>
                    </li>
                    <hr />
                    <li>
                        <a href = "/">Logout</a>
                    </li>
                    <hr />
                </ul>
            </div>
        );
    }
}