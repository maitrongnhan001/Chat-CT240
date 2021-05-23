import { Component } from "react";

export default class Manager extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="manager-information-user">
                <ul>
                    {
                        this.props.Link.map((Element, index) => {
                            return (
                                    <div>
                                        <li>
                                            <a href = {this.props.Link[index]}>{this.props.Manage[index]}</a>
                                        </li>
                                        <hr/>
                                    </div>
                                    )
                        })
                    }
                    <li>
                        <a href="/">Logout</a>
                    </li>
                </ul>
            </div>
        );
    }
}