import {Component} from "react";

export default class Manager extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className = "manager-information-user">
                <ul>
                    {
                        this.props.Link.map( (Element, index) => {
                            return <a href = {this.props.Link[index]}>{this.props.Manage[index]}</a>;
                        })
                    }
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