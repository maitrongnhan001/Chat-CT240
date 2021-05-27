import { Component } from "react";

export default class Manage extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className = {this.props.StatusManage}>
                <span className = "arrow-down"></span>
                <div className = "menu-manage">
                    <ul>
                        <li><a href = "/">Group Management</a></li>
                        <hr/>
                        <li><a href = "/">Friend Management</a></li>
                        <hr/>
                        <li><a href = "/">User Information</a></li>
                        <hr/>
                        <li><a href = "http://localhost:4000">Logout</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}