import { chatEngine } from "react-chat-engine";
import { Component } from "react";

import './App.css';
import Header from "./Component/Group-Chat/Header.js";
import Manage from "./Component/Group-Chat/Manage";

export default class App extends Component {
    render () {
        return (
            <div className = "App">
                <Header/>
            </div>
        );
    }
}