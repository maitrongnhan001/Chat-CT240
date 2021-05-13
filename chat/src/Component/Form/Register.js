import { Component } from 'react';

import '../../StyleForm.css'

export default class Register extends Component {
    render() {
        return (
            <div className="center-container">
                {/*header*/}
                <div className="header-w3l">
                    <h1>Register</h1>
                </div>
                {/*//header*/}
                <div className="main-content-agile">
                    <div className="sub-main-w3">
                        <div className="wthree-pro">
                            <h2>Register</h2>
                        </div>
                        <form action="http://localhost:4000/Register/Store" method="post" enctype="multipart/form-data">
                            <div className="pom-agile">
                                <input placeholder="User Name" name="Username" className="user" type="text" required />
                                <span className="icon1"><i className="fa fa-user" aria-hidden="true" /></span>
                            </div>
                            <div className="pom-agile">
                                <input placeholder="Password" name="Password" className="pass" type="password" required />
                                <span className="icon2"><i className="fa fa-unlock" aria-hidden="true" /></span>
                            </div>
                            <div className="pom-agile">
                                <input placeholder="Enter Again Password" name="rePassword" className="pass" type="password" required />
                                <span className="icon2"><i className="fa fa-unlock" aria-hidden="true" /></span>
                            </div>
                            <div className="pom-agile">
                                <input placeholder="Choose Aavata to change" name="image" className="user" type="file" required />
                                <span className="icon1"><i id="messageAvatar" className="fa fa-user" aria-hidden="true" /></span>
                            </div>
                            <span className = 'ErrorMessage'>{this.props.MessageError}</span>
                            <div className="sub-w3l">
                                <div className="right-w3l">
                                    <input type="submit" defaultValue="Change" />
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