import { Component } from "react";

import '../../StyleForm.css'
import Search from "../Group-Chat/Search.js";

import axios from 'axios';
export default class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StateUserName: '',
            StatePassword: ''
        }
    }

    handleChangeUserName = (event) => {
        const UserName = ({ value: event.target.value });
        this.setState({
            StateUserName: UserName.value
        });
        this.props.GetUserNameOnChange(UserName.value);
    }

    handleChangePassword = (event) => {
        const Password = ({ value: event.target.value });
        this.setState({
            StatePassword: Password.value
        });
    }

    OnSubmitLogin = () => {
        const username = this.state.StateUserName;
        const password = this.state.StatePassword;
        axios.post('/api/login', {
            UserName: username,
            Password: password
        })
            .then(Response => {
                console.log(Response);
            })
            .catch(error => {
                console.log(error);
            })
    }
    //"center-container first-page"
    render() {
        return (
            <div className="center-container first-page">
                {/*header*/}
                <div className="header-w3l">
                    <h1>Online Login Form</h1>
                </div>
                {/*//header*/}
                <div className="main-content-agile">
                    <div className="sub-main-w3">
                        <div className="wthree-pro">
                            <h2>Login Quick</h2>
                        </div>
                    </div>
                    <div className="List-UserChat">
                            <Search
                                StatusSreach="ListGroupChat"
                                ListUser={this.props.ListUser}
                                ClickCreateRoom={this.ClickCreateRoom}
                            />
                        </div>
                    </div>
                    {/*//main*/}
                    {/*footer*/}
                    <div className="footer">
                        <p>© 2017 Online Login Form. All rights reserved | Design by <a href="http://w3layouts.com">W3layouts</a></p>
                    </div>
                    {/*//footer*/}
                </div>
        );
    }
}