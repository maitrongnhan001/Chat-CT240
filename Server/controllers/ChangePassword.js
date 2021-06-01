const User = require('../models/User.js');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const UserName = req.session.UserName;
    const NewPassword = req.body.NewPassword;
    //ma hoa mat khau
    bcrypt.hash(NewPassword, 10, function (err, hash) {
        // Store hash in your password DB.
        //update password
        User.findOneAndUpdate({
            UserName: UserName
        }, {
            Password: hash
        }, (error) => {
            if (!error) {
                return res.redirect('http://localhost:3000');
            }
        });
    });
}