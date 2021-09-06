import { Component } from "react";

export default class MyChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classMessage: "color-content-me inline",
            JSXImage: "",
            time: ""
        }
    }

    componentDidMount() {
        if (this.props.Content.length <= 30) {
            this.setState({
                classMessage: "color-content-me inline"
            });
        } else {
            this.setState({
                classMessage: "color-content-me block"
            });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        try {
            if (nextProps.Content.PathImage) {
                if (nextProps.Content.PathImage.search("/Documents") === 0) {
                    //file is document

                    //get name file
                    const lastPosition = nextProps.Content.PathImage.lastIndexOf("/") + 1;
                    const nameFile = nextProps.Content.PathImage.substring(lastPosition);
                    const JSXImage = (
                        <a href={"http://localhost:4000/" + nextProps.Content.PathImage} download >{nameFile}</a>
                    );
                    const ClassMessage = "color-content-me inline";
                    if (ClassMessage !== prevState.classMessage) {
                        //get time
                        const Time = new Date(nextProps.Content.Time);
                        const Hours = Time.getHours();
                        const Minutes = Time.getMinutes();
                        return {
                            classMessage: ClassMessage,
                            JSXImage: JSXImage,
                            Time: Hours + ":" + Minutes
                        }
                    }
                } else {
                    //file is image
                    const JSXImage = (
                        <div>
                            <img alt="Error" className="message-img" src={"http://localhost:4000/" + nextProps.Content.PathImage}></img>
                        </div>);
                    const ClassMessage = "block";
                    if (ClassMessage !== prevState.classMessage) {
                        return {
                            classMessage: ClassMessage,
                            JSXImage: JSXImage
                        }
                    }
                }
            } else {
                let ClassMessage;
                if (nextProps.Content.Content.length <= 30) {
                    ClassMessage = "color-content-me inline";
                } else {
                    ClassMessage = "color-content-me block";
                }
                if (ClassMessage !== prevState.classMessage) {
                    //get time
                    const Time = new Date(nextProps.Content.Time);
                    const Hours = Time.getHours();
                    const Minutes = Time.getMinutes();
                    return {
                        classMessage: ClassMessage,
                        JSXImage: nextProps.Content.Content,
                        Time: Hours + ":" + Minutes
                    }
                }
            }
        } catch (e) { return null; }
    }

    render() {
        return (
            <div className="user-chat message">
                <div className="container">
                    <div className="row">
                        <div className="col-11">
                            <div dir="auto" className="chat-content right">
                                <div className={this.state.classMessage}>
                                    <div>
                                        {this.state.JSXImage}
                                    </div>
                                    <div class="time-left">{this.state.Time}</div>
                                </div>
                            </div>
                        </div>
                        <div className="custom-col-1">
                            <img alt="Error" className="avatar right" src={this.props.PathAvatar}></img>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}