const Chat = require('../models/Chat.js');

module.exports = (req, res) => {
    const UserName = req.session.UserName;
    const ID = req.body.ID.substr(1);
    let ListUser= [];
    Chat.findById(ID , (error, Data) => {
        ListUser = Data.ListUser;
        for(let index in ListUser) {
            if(ListUser[index].UserName === UserName) {
                ListUser.splice(index, 1);
                break;
            }
        }
        res.json({
            ListUser: ListUser
        });
    });
}