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
                if (this.state.file.type === "image/jpeg" || this.state.file.type === "image/png") {
                    //file is image
                    this.props.HandleContentChat(
                        {
                            ContentData: this.state.ContentData,
                            File: this.state.file
                        }
                    );
                } else {
                    //file is not image
                    this.props.HandleMessageFile(
                        {
                            ContentData: this.state.ContentData,
                            File: this.state.file
                        }
                    );
                }
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
                                <div className="col-1-file">
                                    <label htmlFor="inputImage">
                                        <svg viewBox="0 0 36 36" height="40px" width="40px">
                                            <path d="M13.5 16.5a2 2 0 100-4 2 2 0 000 4z" fill="#0099FF">
                                            </path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12v12a4 4 0 004 4h14a4 4 0 004-4V12a4 4 0 00-4-4H11a4 4 0 00-4 4zm18-1.5H11A1.5 1.5 0 009.5 12v9.546a.25.25 0 00.375.217L15 18.803a6 6 0 016 0l5.125 2.96a.25.25 0 00.375-.217V12a1.5 1.5 0 00-1.5-1.5z" fill="#0099FF">
                                            </path>
                                        </svg>
                                    </label>
                                    <input type="file"
                                        className="form-control"
                                        id="inputImage"
                                        aria-describedby="inputGroupFileAddon04"
                                        aria-label="Upload"
                                        accept=".jpg,.png"
                                        onChange={this.changeFile}
                                    />
                                </div>
                                <div className="col-1-file">
                                    <label htmlFor="inputFile">
                                        <svg viewBox="0 0 40 40" height="45px" width="45px">
                                            <path d="M8 12a4 4 0 014-4h12a4 4 0 014 4v5a1 1 0 01-1 1h-3a6 6 0 00-6 6v3a1 1 0 01-1 1h-5a4 4 0 01-4-4V12z" fill="#0099FF"></path>
                                            <path d="M20 27c0 .89 1.077 1.33 1.707.7l5.993-5.993c.63-.63.19-1.707-.7-1.707h-3a4 4 0 00-4 4v3z" fill="#0099FF"></path>
                                        </svg>
                                    </label>
                                    <input type="file"
                                        className="form-control"
                                        id="inputFile"
                                        aria-describedby="inputGroupFileAddon04"
                                        aria-label="Upload"
                                        accept="file_extension|audio/*|video/*|image/*|media_type"
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="r-col-3"></div>
            </div>

        );
    }
}