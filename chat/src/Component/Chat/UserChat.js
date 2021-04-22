import {Component} from "react";

export default class UserChat extends Component {
    constructor (props) {
        super(props);
        this.state = {
            classMessage: "inline"
        }
    }

    componentDidMount() {
        if(this.props.Content.length <= 30){
            this.setState ({
                classMessage: "inline"
            });
        }else{
            this.setState ({
                classMessage: "block"
            });
        }
    }

    render () {
        return (
            <div className = "user-chat message">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-1">
                            <img className="avatar" src= {this.props.PathAvatar}></img>
                        </div>
                        <div className = "col-11">
                            <div dir = "auto" className = "chat-content">
                                <span className = {'color-content ' + this.state.classMessage}>
                                    <span>
                                        {this.props.Content}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}