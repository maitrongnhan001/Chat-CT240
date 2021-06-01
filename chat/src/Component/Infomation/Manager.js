import { Component } from "react";

export default class Manager extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div
                className={this.props.StatusManager}
            >
                <ul>
                    {
                        this.props.Link.map((Element, index) => {
                            return (
                                <div
                                    onClick={() => this.props.ClickItemManagerInformation(index)}
                                >
                                    <li>
                                        <a>{this.props.Manage[index]}</a>
                                    </li>
                                    <hr />
                                </div>
                            )
                        })
                    }
                    <li>
                        <a href="http://localhost:4000/logout">Logout</a>
                    </li>
                </ul>
            </div>
        );
    }
}