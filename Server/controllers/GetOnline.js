const StatusOnline = require("../models/StatusOnline.js");

module.exports = (req, res) => {
    const UserName = req.body.UserName;
    StatusOnline.findOne({
        UserName: UserName
    }, (error, data) => {
        if(data) {
            return res.json(data.UserName);
        }
        return res.json("");
    });
}