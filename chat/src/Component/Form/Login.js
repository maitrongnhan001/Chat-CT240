import { Component } from "react";

import "./CSS/StyleForm.scss"

import axios from 'axios';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StateUserName: '',
            StatePassword: ''
        }
    }

    handleChangeUserName = (event) => {
        const UserName = ({value: event.target.value});
        this.setState({
            StateUserName: UserName.value
        });
        this.props.GetUserNameOnChange(UserName.value);
    }

    handleChangePassword = (event) => {
        const Password = ({value: event.target.value});
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

    render() {
        return (
            <div className="center-container">
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
                        <form action = "http://localhost:4000/api/login" method = "post">
                            <div className="pom-agile">
                                <input 
                                    placeholder="User Name"
                                    onChange = {this.handleChangeUserName}
                                    name="UserName" 
                                    className="user" 
                                    type="text" 
                                    required />
                                <span className="icon1"><i className="fa fa-user" aria-hidden="true" /></span>
                            </div>
                            <div className="pom-agile">
                                <input 
                                    placeholder="Password" 
                                    onChange = {this.handleChangePassword}
                                    name="Password" 
                                    className="pass" 
                                    type="password" 
                                    required 
                                    />
                                <span className="icon2"><i className="fa fa-unlock" aria-hidden="true" /></span>
                            </div>
                            <span className = 'ErrorMessage'>{this.props.MessageError}</span>
                            <div className="sub-w3l">
                                <div className="row">
                                    <h6 className="left"><a href="http://localhost:3000/Register">Register</a></h6>
                                    <h6 className="right"><a href="#">Forgot Password?</a></h6>
                                </div>
                                <br />
                                <div className="right-w3l">
                                    <input 
                                        type="submit"
                                        defaultValue="Login" />
                                </div>
                            </div>
                        </form>
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