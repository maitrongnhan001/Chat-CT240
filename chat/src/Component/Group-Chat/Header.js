import { Component } from "react";
import Manage from "./Manage";

export default class Header extends Component {

    render() {
        return (
            <nav className="Header-Group-chat">
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <img className="infor-img" src="./img/Account/Nhan.jpg"></img>
                        </div>
                        <div className="col-6">
                            <p>
                               <h2>Chat</h2>
                            </p>
                        </div>
                        <div className="col-3">
                            <div className = "Manage">
                                <svg viewBox="0 0 36 36" 
                                    class="a8c37x1j ms05siws hwsy1cff b7h9ocf4" 
                                    height="30" 
                                    width="30">
                                        <path d="M12.5 18A2.25 2.25 0 118 18a2.25 2.25 0 014.5 0zm7.75 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm5.5 2.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z">
                                        </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col-11">
                            <input
                                role="combobox" placeholder="         Tìm kiếm trên Messenger" 
                                class="input-search" 
                                type="text" >
                            </input>
                        </div>
                    </div>
                </div>
                <Manage/>
            </nav>
        );
    }
}