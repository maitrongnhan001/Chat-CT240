import { Component } from "react";
import axios from "axios";
import "./CSS/Medias.scss";

export default class extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className={"Media-of-chat " + this.props.StatusMedia}>
                <div className="header-media">
                    <div className="container">
                        <div className="row">
                            <div className="col-2">
                                <div className="exit-search"
                                    onClick={this.props.ExitMedia}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="icon-exit" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="col-9">
                                <h3><div>Media</div></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="main-media">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <img className="img-media" src="/images/AvatarUsers/Screen Shot 2021-06-22 at 09.38.09.png"></img>
                            </div>
                            <div className="col-6">
                            <img className="img-media" src="/images/AvatarUsers/Screen Shot 2021-06-22 at 09.38.09.png"></img>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                            <img className="img-media" src="/images/AvatarUsers/Screen Shot 2021-06-22 at 09.38.09.png"></img>
                            </div>
                            <div className="col-6">
                            <img className="img-media" src="/images/AvatarUsers/Screen Shot 2021-06-22 at 09.38.09.png"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}