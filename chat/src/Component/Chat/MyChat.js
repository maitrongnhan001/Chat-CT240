import {Component} from "react";

export default class MyChat extends Component {
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

    static getDerivedStateFromProps(nextProps, prevState) {
        let ClassMessage;
        if(nextProps.Content.length <= 30){
            ClassMessage = "inline";
        }else{
            ClassMessage = "block";
        }
        if(ClassMessage !== prevState.classMessage) {
            return {classMessage: ClassMessage}
        }
    }

    render () {
        return (
            <div className = "user-chat message">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-11">
                            <div dir = "auto" className = "chat-content right">
                                <span className = {'color-content-me ' + this.state.classMessage}>
                                    <span>
                                        {this.props.Content}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className = "col-1">
                            <img className="avatar right" src={this.props.PathAvatar}></img>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}