import { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import './App.css';
import Login from "./Component/Form/Login.js";
import Register from "./Component/Form/Register";
import Delete from "./Component/Form/Delete";
import UserManagement from "./Component/Form/UserManagement";
import ChatApp from "./Component/ChatApp.js";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyUserName: 'null'
        };
    }

    GetUserName = (UserName) => {
        this.setState({
            MyUserName: UserName
        });
    }

    render() {
        return (
                <Router>
                    <Switch>
                        <Route path='/chat'>
                            <ChatApp MyUserName = {this.state.MyUserName}/>
                        </Route>
                        <Route path='/UserManagement'>
                            <UserManagement />
                        </Route>
                        <Route path='/Delete'>
                            <Delete />
                        </Route>
                        <Route path='/RegisterError'>
                            <Register MessageError = {'User is exist'}/>
                        </Route>
                        <Route path='/Register'>
                            <Register MessageError = {''}/>
                        </Route>
                        <Route path='/LoginError'>
                            <Login 
                                GetUserNameOnChange = {this.GetUserName}
                                MessageError = {'User name or password is invalid'} />
                        </Route>
                        <Route path='/'>
                            <Login
                                GetUserNameOnChange = {this.GetUserName}
                                MessageError = {''}
                            />
                        </Route>
                    </Switch>
                </Router>
        );
    }
}