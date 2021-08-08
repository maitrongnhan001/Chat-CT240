import { Component } from "react";
import axios from "axios";
import "./CSS/Medias.scss";

export default class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: "",
            ListPathImage: []
        }
    }
    //get list path image
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.ID !== prevState.ID) {
            axios.post('/api/getMedia', { ID: this.props.ID })
                .then(Response => {
                    this.setState({
                        ID: this.props.ID,
                        ListPathImage: Response.data.ListPathImage
                    })
                })
                .catch(error => { })
            this.setState({
                ID: this.props.ID
            });
        }
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
                        {this.state.ListPathImage.map((Element, Index) => {
                            //maping each row have two image
                            if (Index % 2 === 0) {
                                return (
                                    <div className="row">
                                        <div className="col-6">
                                            <img alt="Error" className="img-media" src={this.state.ListPathImage[Index]}></img>
                                        </div>
                                        <div className="col-6">
                                            <img alt="Error" className="img-media" src={this.state.ListPathImage[Index + 1]}></img>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}