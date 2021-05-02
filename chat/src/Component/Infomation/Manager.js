import {Component} from "react";

export default class Manager extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className = "manager-information-user">
                <ul>
                    <li>
                        <a href = {this.props.Link[0]}>{this.props.Manage[0]}</a>
                    </li>
                    <hr />
                    <li>
                        <a href = {this.props.Link[1]}>{this.props.Manage[1]}</a>
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