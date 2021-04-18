import { Component } from "react";

export default class Manage extends Component {
    render () {
        return (
            <div className = "show">
                <span className = "arrow-down"></span>
                <div className = "menu-manage">
                    <ul>
                        <li><a href = "/">Delete Group</a></li>
                        <hr/>
                        <li><a href = "/">Group Management</a></li>
                        <hr/>
                        <li><a href = "/">Friend Management</a></li>
                        <hr/>
                        <li><a href = "/">User Information</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}