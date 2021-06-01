import { Component } from 'react';

import '../../StyleForm.css'

export default class Delete extends Component {
    render() {
        return (
            <div className={this.props.statusChangeAvatar}>
                {/*header*/}
                <div className="header-w3l">
                    <h1>Change Avatar Form</h1>
                </div>
                {/*//header*/}
                <div className="main-content-agile">
                    <div className="sub-main-w3">
                        <div className="wthree-pro">
                            <h2>Change Avatar</h2>
                        </div>
                        <form action="http://localhost:4000/change/avatar" method="post" enctype="multipart/form-data">
                            <div className="pom-agile">
                                <input placeholder="Choose Aavata to change" name="image" className="user" type="file" required />
                                <span className="icon1"><i id="messageAvatar" className="fa fa-user" aria-hidden="true" /></span>
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