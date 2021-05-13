import { Component } from 'react';

import '../../StyleForm.css'

export default class Delete extends Component {
    render() {
        return (
            <div className="center-container">
                {/*header*/}
                <div className="header-w3l">
                    <h1>Delete Group Form</h1>
                </div>
                {/*//header*/}
                <div className="main-content-agile">
                    <div className="sub-main-w3">
                        <div className="wthree-pro">
                            <h2>Delete</h2>
                        </div>
                        <form action="#" method="post">
                            <div className="pom-agile">
                                <input placeholder="Name user" name="Name" className="user" type="text" required />
                                <span className="icon1"><i className="fa fa-user" aria-hidden="true" /></span>
                            </div>
                            <div className="sub-w3l">
                                <div className="right-w3l">
                                    <input type="submit" defaultValue="Delete" />
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