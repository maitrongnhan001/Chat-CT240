import { Component } from "react";
import Manage from "./Manage";
import "./CSS/Header.scss";
let check = true;
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StatusManage: "hide",
            StatusSearch: "input-search",
            StatusBtnExit: "hide",
            valueSearch: "",
        }
    };
    StatusManage = false;
    ClickToManage = () => {
        this.StatusManage = !this.StatusManage;
        if (this.StatusManage) {
            this.setState({ StatusManage: "show" });
        } else {
            this.setState({ StatusManage: "hide" });
        }
    }
    InputSreachClick = () => {
        if (check) {
            //set layout ListGroupChat
            this.props.InputSreachClick(check);
            //set InputSreach
            this.setState({
                StatusSearch: "input-search searching",
                StatusBtnExit: ''
            });
            check = false;
        }
    }

    HandleContent = (event) => {
        const OldValueSearch = this.state.valueSearch;
        if (!(event.target.value === "" ||
            (event.target.value - OldValueSearch) === " ")) {
            this.props.HandleInputSearch(event.target.value.trim());
        }
        this.setState({ valueSearch: event.target.value });
    }

    ExitClick = () => {
        //set layout ListGroupChat
        this.props.InputSreachClick(check);
        //set InputSreach
        this.setState({
            StatusSearch: "input-search",
            StatusBtnExit: 'hide',
            valueSearch: ""
        });
        check = true;
    }

    ClickShowListGroup = () => {
        this.props.ClickShowListGroup();
        //set InputSreach
        this.ClickToManage();
    }

    componentWillUpdate(prevProps) {
        if (prevProps.check !== this.props.check) {
            if (!prevProps.check) {
                this.ExitClick();
            }
        }
    }

    render() {
        return (
            <nav className="Header-Group-chat">
                <div className="container">
                    <div className="row" id="row-1-Header-Group-Chat">
                        <div className="col-3">
                            <img alt="Error" className="infor-img" src={this.props.MyData}></img>
                        </div>
                        <div className="col-6">
                            <p>
                                <h2>Chat</h2>
                            </p>
                        </div>
                        <div className="col-3">
                            <div className="Manage" onClick={this.ClickToManage}>
                                <svg viewBox="0 0 36 36"
                                    class="a8c37x1j ms05siws hwsy1cff b7h9ocf4"
                                    height="30"
                                    width="30">
                                    <path d="M12.5 18A2.25 2.25 0 118 18a2.25 2.25 0 014.5 0zm7.75 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm5.5 2.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z">
                                    </path>
                                </svg>
                                <div class = "br-5"></div>
                                <Manage
                                    ClickShowListGroup={this.ClickShowListGroup}
                                    StatusManage={this.state.StatusManage}
                                    ChangePassword={this.props.ChangePassword}
                                    ChangeAvatar={this.props.ChangeAvatar} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className={"col-1 " + this.state.StatusBtnExit}>
                            <div className={"exit-search " + this.state.StatusBtnExit}
                                onClick={this.ExitClick}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="icon-exit" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                </svg>
                            </div>
                        </div>
                        <div className="col-11">
                            <input
                                placeholder="         Tìm kiếm trên Messenger"
                                value={this.state.valueSearch}
                                class={this.state.StatusSearch}
                                onChange={this.HandleContent}
                                onClick={this.InputSreachClick}
                                type="text" >
                            </input>
                        </div>
                    </div>
                </div>
                {/* <Manage
                    ClickShowListGroup={this.ClickShowListGroup}
                    StatusManage={this.state.StatusManage}
                    ChangePassword={this.props.ChangePassword}
                    ChangeAvatar={this.props.ChangeAvatar} /> */}
            </nav>
        );
    }
}