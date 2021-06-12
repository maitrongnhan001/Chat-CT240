const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const StatusOnline = require('../models/StatusOnline.js');

module.exports = (req, res) => {
    const {UserName, Password} = req.body;
    User.findOne(
        {
            UserName: UserName
        }
        , (error, UserData) => {
        if(UserData) {
            bcrypt.compare(Password, UserData.Password, (error, same) => {
                if(same) {
                    //successfully
                    req.session.UserName = UserData.UserName;
                    //user is online, set status
                    StatusOnline.create({UserName: UserData.UserName});
                    //respone is api
                    res.redirect('http://localhost:3000/chat');
                }else{
                    res.redirect('http://localhost:3000/LoginError');
                }
            })
        }else{
            res.redirect('http://localhost:3000/LoginError');
        }
    })
}