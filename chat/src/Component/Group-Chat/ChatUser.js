import { Component } from "react";

export default class extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="row" onClick = {() => this.props.ClickChatUser(this.props.ID)}>
                <div className="col-3">
                    <img className="avartar-in-list-group" src={this.props.PathAvatar} />
                </div>
                <div className="col-9">
                    <p>{this.props.UserName}</p>
                </div>
            </div>
        );
    }
}