const User = require('../models/User.js');
const Friend = require('../models/Friend.js');
const path = require('path');

module.exports = (req, res) => {
    let image = req.files.image;
    //store image of user
    image.mv(path.resolve(__dirname, '../public/images/AvatarUsers', image.name), function (error) {
        User.create({
                UserName: req.body.Username,
                Password: req.body.Password,
                PathAvatar: '/images/AvatarUsers/' + image.name
            }, function (err, UserInfo) {
                if(err) {
                    return res.redirect('http://localhost:3000/RegisterError')
                }
                Friend.create({
                    UserName: req.body.Username,
                    ListFriend: []
                }, (error) => {});
                res.redirect('http://localhost:3000');
            });
        });
}