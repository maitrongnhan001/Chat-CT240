import { Component } from "react";
import "./CSS/Manager.scss";

export default class Manage extends Component {

    render () {
        return (
            <div className = {this.props.StatusManage}>
                <span className = "arrow-down"></span>
                <div className = "menu-manage">
                    <ul>
                        <li
                            onClick={() => this.props.ClickShowListGroup()}
                        ><p>Danh sách nhóm</p></li>
                        <li><p>Tin nhắn đang chờ</p></li>
                        <li><p>Nguời liên hệ đang hoạt động</p></li>
                        <hr/>
                        <li onClick={() => this.props.ChangePassword(true)}>
                            <p>
                                Đổi mật khẩu
                            </p>
                        </li>
                        <li
                            onClick={() => this.props.ChangeAvatar(true)}
                        ><p>Đổi ảnh đại diện</p></li>
                        <hr/>
                        <li><a href="http://localhost:4000">Đăng xuất</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}