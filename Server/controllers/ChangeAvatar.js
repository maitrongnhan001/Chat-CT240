const User = require('../models/User.js');
const path = require('path');

module.exports = (req, res) => {
    const UserName = req.session.UserName;
    const image = req.files.image;
    //store image of user
    image.mv(path.resolve(__dirname, '../public/images/AvatarUsers', image.name), (error) => {
        User.findOneAndUpdate({
            UserName: UserName
        }, {
            PathAvatar: '/images/AvatarUsers/' + image.name
        }, (error) => {
            return res.redirect('http://localhost:3000');
        });
    });
}