import { Component } from 'react';
import axios from 'axios';

import '../../StyleForm.css'

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StatusPassword: "",
            StatusRPassword: "",
            StatusSubmit: "disabled",
            OldPassword: "",
            NewPassword: "",
            RPassword: "",
        }
    }

    HandlePassword = (e) => {
        this.setState({
            Password: e.target.value
        });
    }

    HandleNewPassword = (e) => {
        this.setState({
            NewPassword: e.target.value
        });
    }

    HandleRPassword = (e) => {
        this.setState({
            RPassword: e.target.value
        });
    }

    CheckPassword = () => {
        axios.post('/api/checkPassword', {
            Password: this.state.Password
        })
            .then(Response => {
                if (Response.data.check) {
                    this.setState({
                        StatusPassword: "",
                        StatusSubmit: ""
                    });
                } else {
                    this.setState({
                        StatusPassword: "Password is invalid",
                        StatusSubmit: "disabled"
                    });
                }
            })
            .catch(error => { })
    }

    CheckRPassword = (e) => {
        this.setState({
            RPassword: e.target.value
        });
        if (this.state.NewPassword === this.state.RPassword) {
            this.setState({
                StatusRPassword: "",
                StatusSubmit: ""
            });
        } else {
            this.setState({
                StatusRPassword: "Password is invalid",
                StatusSubmit: "disabled"
            });
        }
    }
    render() {
        return (
            <div className={this.props.statusChangePassword}>
                {/*header*/}
                <div className="header-w3l">
                    <h1>Change Password Form</h1>
                </div>
                {/*//header*/}
                <div className="main-content-agile">
                    <div className="sub-main-w3">
                        <div className="wthree-pro">
                            <h2>Change Password</h2>
                        </div>
                        <form action="http://localhost:4000/Change/Password" method="post">
                            <div className="pom-agile">
                                <input
                                    placeholder="Old Password"
                                    name="OldPassword"
                                    className="pass"
                                    type="password"
                                    value={this.state.Password}
                                    onChange={this.HandlePassword}
                                    onBlur={this.CheckPassword}
                                    required
                                />
                                <span
                                    className="icon2"
                                ><i
                                        className="fa fa-unlock"
                                        aria-hidden="true"
                                    /></span>
                            </div>
                            <span className="red"> {this.state.StatusPassword} </span>
                            <div className="pom-agile">
                                <input
                                    placeholder="New Password"
                                    name="NewPassword"
                                    value={this.state.NewPassword}
                                    onChange={this.HandleNewPassword}
                                    className="pass"
                                    type="password"
                                    required
                                />
                                <span className="icon2"><i className="fa fa-unlock" aria-hidden="true" /></span>
                            </div>
                            <div className="pom-agile">
                                <input
                                    placeholder="retype Password"
                                    name="RPassword"
                                    value={this.state.RPassword}
                                    onChange={this.HandleRPassword}
                                    onBlur={this.CheckRPassword}
                                    className="pass"
                                    type="password"
                                    required
                                />
                                <span className="icon2"><i className="fa fa-unlock" aria-hidden="true" /></span>
                            </div>
                            <span className="red"> {this.state.StatusRPassword} </span>
                            <div className="sub-w3l">
                                <div className="right-w3l">
                                    <input type="submit"
                                        defaultValue="Change"
                                        disabled={this.state.StatusSubmit}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/*footer*/}
                <div className="footer">
                    <p>© 2017 Online Login Form. All rights reserved | Design by <a href="http://w3layouts.com">W3layouts</a></p>
                </div>
                {/*//footer*/}
            </div>
        );
    }
}