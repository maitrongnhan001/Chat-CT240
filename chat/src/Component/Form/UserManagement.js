import { Component } from 'react';

export default class UserManagement extends Component {
    render() {
        return (
            <div className="center-container">
                {/*header*/}
                <div className="header-w3l">
                    <h1>Change Information Of User Form</h1>
                </div>
                {/*//header*/}
                <div className="main-content-agile">
                    <div className="sub-main-w3">
                        <div className="wthree-pro">
                            <h2>User Management</h2>
                        </div>
                        <form action="#" method="post">
                            <div className="pom-agile">
                                <input placeholder="User Name" name="Name" className="user" type="text" />
                                <span className="icon1"><i className="fa fa-user" aria-hidden="true" /></span>
                            </div>
                            <div className="pom-agile">
                                <input placeholder="Password" name="Password" className="pass" type="password" />
                                <span className="icon2"><i className="fa fa-unlock" aria-hidden="true" /></span>
                            </div>
                            <div className="pom-agile">
                                <input placeholder="Enter Again Password" name="Password" className="pass" type="password" />
                                <span className="icon2"><i className="fa fa-unlock" aria-hidden="true" /></span>
                            </div>
                            <div className="pom-agile">
                                <input placeholder="Choose Aavata to change" name="Name" className="user" type="file" />
                                <span className="icon1"><i className="fa fa-user" aria-hidden="true" /></span>
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