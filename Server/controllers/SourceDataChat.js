const User = require('../models/User.js');
const Chat = require('../models/Chat.js');
const RoomChat = require('../models/RoomChat.js')

module.exports = (req, res) => {
    console.log(req.session.UserName);
    res.json({
        Name: 'Tran Thi Diem Em'
    });
}