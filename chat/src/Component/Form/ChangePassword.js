import { Component } from 'react';

import '../../StyleForm.css'

export default class UserManagement extends Component {
    render() {
        return (
            <div className="center-container">
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
                                <input placeholder="Old Password" name="OldPassword" className="pass" type="password" />
                                <span className="icon2"><i className="fa fa-unlock" aria-hidden="true" /></span>
                            </div>
                            <div className="pom-agile">
                                <input placeholder="New Password" name="NewPassword" className="pass" type="password" />
                                <span className="icon2"><i className="fa fa-unlock" aria-hidden="true" /></span>
                            </div>
                            <div className="pom-agile">
                                <input placeholder="retype Password" name="RNewPassword" className="pass" type="password" />
                                <span className="icon2"><i className="fa fa-unlock" aria-hidden="true" /></span>
                            </div>
                            <div className="sub-w3l">
                                <div className="right-w3l">
                                    <input type="submit" defaultValue="Change" />
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