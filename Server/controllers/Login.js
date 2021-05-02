const bcrypt = require('bcrypt');
const User = require('../models/User.js');

module.exports = (req, res) => {
    const MessageData = {
        MessageUserName: '',
        MessagePassword: ''
    }
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
                    res.redirect('http://localhost:3000');
                }else{
                    MessageData.Password = "Password is invalid";
                    res.render('Login', {
                        Message: MessageData
                    });
                }
            })
        }else{
            MessageData.MessageUserName = 'User is not exist';
            res.render('Login', {
                Message: MessageData
            });
        }
    })
}