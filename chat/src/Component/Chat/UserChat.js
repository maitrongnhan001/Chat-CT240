import { Component } from "react";

export default class UserChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classMessage: "color-content inline",
            JSXImage: ""
        }
    }

    componentDidMount() {
        if (this.props.Content.length <= 30) {
            this.setState({
                classMessage: "color-content inline"
            });
        } else {
            this.setState({
                classMessage: "color-content block"
            });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        try {
            if (nextProps.Content.PathImage) {
                const JSXImage = (
                    <div>
                        <img className="message-img" src={nextProps.Content.PathImage}></img>
                    </div>);
                const ClassMessage = "block";
                if (ClassMessage !== prevState.classMessage) {
                    return {
                        classMessage: ClassMessage,
                        JSXImage: JSXImage
                    }
                }
            } else {
                let ClassMessage;
                if (nextProps.Content.Content.length <= 30) {
                    ClassMessage = "color-content inline";
                } else {
                    ClassMessage = "color-content block";
                }
                if (ClassMessage !== prevState.classMessage) {
                    return {
                        classMessage: ClassMessage,
                        JSXImage: nextProps.Content.Content
                    }
                }
            }
        }catch (e) { return null; }
    }

    render() {
        return (
            <div className="user-chat message">
                <div className="container">
                    <div className="row">
                        <div className="custom-col-1">
                            <img className="avatar" src={this.props.PathAvatar}></img>
                        </div>
                        <div className="col-11">
                            <div dir="auto" className="chat-content">
                                <span className={this.state.classMessage}>
                                    <span>
                                        {this.state.JSXImage}
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