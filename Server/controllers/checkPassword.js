const User = require('../models/User.js');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const UserName = req.session.UserName;
    const Password = req.body.Password;
    User.findOne({UserName: UserName}, (error, Data) => {
        bcrypt.compare(Password, Data.Password, (error, same) => {
            if (same) {
                return res.json({
                    check: true
                });
            }else {
                return res.json({
                    check: false
                });
            }
        });
    });
}
