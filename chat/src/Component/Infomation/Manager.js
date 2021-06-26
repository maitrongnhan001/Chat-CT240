import { Component } from "react";
import "./CSS/Manager.scss";

export default class Manager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Manager: []
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let Manager = [];
        const firstElementID = nextProps.ID[0];
        if (firstElementID === "U") {
            Manager = [
                "Add Group",
                "Delete Chat",
                "Media",
            ]
        } else {
            Manager = [
                "Add User",
                "Out Group",
                "Media",
                "Member",
            ]
        }
        if (Manager !== prevState.Manage) {
            return { Manager: Manager }
        }
        return null;
    }
    render() {
        return (
            <div
                className={"manager-information-user " + this.props.StatusManager}
            >
                <ul>
                    {
                        this.state.Manager.map((Element, index) => {
                            return (
                                <div
                                    onClick={() => this.props.ClickItemManagerInformation(index)}
                                >
                                    <li>
                                        <a>{this.state.Manager[index]}</a>
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