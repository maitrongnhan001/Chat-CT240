import { Component } from "react";
import "./CSS/Manager.scss";

export default class Manage extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className = {this.props.StatusManage}>
                <span className = "arrow-down"></span>
                <div className = "menu-manage">
                    <ul>
                        <li
                            onClick={() => this.props.ClickShowListGroup()}
                        ><a>Danh sách nhóm</a></li>
                        <li><a href = "http://localhost:4000">Tin nhắn đang chờ</a></li>
                        <li><a href = "http://localhost:4000">Nguời liên hệ đang hoạt động</a></li>
                        <hr/>
                        <li
                            onClick={() => this.props.ChangePassword(true)}
                        ><a>Đổi mật khẩu</a></li>
                        
                        <li
                            onClick={() => this.props.ChangeAvatar(true)}
                        ><a>Đổi ảnh đại diện</a></li>
                        <hr/>
                        <li><a href = "http://localhost:4000">Đăng xuất</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}