import { Component } from 'react';

import '../../StyleForm.css'

export default class Delete extends Component {
    render() {
        return (
            <div className="center-container">
                {/*header*/}
                <div className="header-w3l">
                    <h1>Change User Name Form</h1>
                </div>
                {/*//header*/}
                <div className="main-content-agile">
                    <div className="sub-main-w3">
                        <div className="wthree-pro">
                            <h2>Change User Name</h2>
                        </div>
                        <form action="http://localhost:4000/ChangeUserName" method="post">
                            <div className="pom-agile">
                                <input placeholder="Name user" name="NewUserName" className="user" type="text" required />
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