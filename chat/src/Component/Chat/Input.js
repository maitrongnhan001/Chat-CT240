import { Component } from "react";
import "./CSS/Input.scss";

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ContentData: '',
            file: ""
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.SubmitMessage();
        }
    }

    SubmitMessage = () => {
        if (this.state.ContentData.trim() !== "") {
            if (this.state.file !== "") {
                this.props.HandleContentChat(
                    {
                        ContentData: this.state.ContentData,
                        File: this.state.file
                    }
                );
            } else {
                this.props.HandleContentChat(
                    this.state.ContentData
                );
            }
        }
        this.setState({
            ContentData: '',
            file: ''
        });
    }

    changeFile = (event) => {
        try {
            const file = event.target.files[0];
            this.setState({
                file: file,
                ContentData: file.name
            });
        } catch (e) { }
    }

    HandleContent = (event) => {
        this.setState({ ContentData: event.target.value });
    }

    render() {
        return (
            <div className="ip">
                <div className="r-col-1"></div>
                <div className="r-col-2">
                    <div className="input-chat">
                        <div className="container">
                            <div className="row">
                                <div className="col-1">
                                    <label htmlFor="inputGroupFile04">
                                        <svg viewBox="0 0 36 36" height="35px" width="35px" class="a8c37x1j muag1w35 dlv3wnog enqfppq2 rl04r1d5 ms05siws hr662l2t b7h9ocf4 crt8y2ji">
                                            <path d="M13.5 16.5a2 2 0 100-4 2 2 0 000 4z" fill="#0099FF">
                                            </path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12v12a4 4 0 004 4h14a4 4 0 004-4V12a4 4 0 00-4-4H11a4 4 0 00-4 4zm18-1.5H11A1.5 1.5 0 009.5 12v9.546a.25.25 0 00.375.217L15 18.803a6 6 0 016 0l5.125 2.96a.25.25 0 00.375-.217V12a1.5 1.5 0 00-1.5-1.5z" fill="#0099FF">
                                            </path>
                                        </svg>
                                    </label>
                                    <input type="file"
                                        className="form-control"
                                        id="inputGroupFile04"
                                        aria-describedby="inputGroupFileAddon04"
                                        aria-label="Upload"
                                        accept=".jpg,.png"
                                        onChange={this.changeFile}
                                    />
                                </div>
                                <div className="col-10">
                                    <input className="message-chat"
                                        autocomplete="off"
                                        type="text"
                                        name="ContentChat"
                                        value={this.state.ContentData}
                                        onChange={this.HandleContent}
                                        onKeyDown={this.handleKeyDown}
                                        placeholder="Nhập tin nhắn">
                                    </input>
                                </div>
                                <div className="col-1">
                                    <button
                                        type='button'
                                        className="submit-message"
                                        onClick={() => this.SubmitMessage()}
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
                </div>
                <div className="r-col-3"></div>
            </div>

        );
    }
}