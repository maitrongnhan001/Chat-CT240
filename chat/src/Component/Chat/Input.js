import { Component } from "react";

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ContentData: ''
        }
    }

    HandleContent = (event) => {
        this.setState({ ContentData: event.target.value });
    }

    render() {
        return (
            <div className="input-chat">
                <div className="container">
                    <div className="row">
                        <div className="col-11">
                            <input className="message-chat"
                                type="text"
                                name="ContentChat"
                                value={this.state.ContentData}
                                onChange={this.HandleContent}
                                placeholder="Nhập tin nhắn">
                            </input>
                        </div>
                        <div className="col-1">
                            <button className="submit-message"
                                onClick={() => {
                                    this.props.HandleContentChat(
                                        this.state.ContentData
                                    );
                                    this.setState({
                                        ContentData: ''
                                    });
                                }}
                            >
                                <svg aria-label="Direct"
                                    class="_8-yf5 "
                                    fill="#262626"
                                    height="30"
                                    viewBox="0 0 48 48"
                                    width="30">
                                    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l13.2 13c.5.4 1.1.6 1.7.3l16.6-8c.7-.3 1.6-.1 2 .5.4.7.2 1.6-.5 2l-15.6 9.9c-.5.3-.8 1-.7 1.6l4.6 19c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.5-.5.5-1.1.2-1.6z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}