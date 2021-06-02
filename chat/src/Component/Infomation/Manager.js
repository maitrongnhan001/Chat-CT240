import { Component } from "react";

export default class Manager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Manager: []
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let Manager = [];
        for( let index in nextProps.Manage) {
            Manager.push(nextProps.Manage[index]);
        }
        if(nextProps.StatusFriend !== "") {
            Manager.push(nextProps.StatusFriend);
        }
        if(Manager !== prevState.Manage) {
            return {Manager: Manager}
        }
        return null;
    }
    render() {
        return (
            <div
                className={this.props.StatusManager}
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