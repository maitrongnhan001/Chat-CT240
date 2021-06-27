const ChatImage = require("../models/ChatImage.js");
module.exports = (req, res) => {
    const ID = req.body.ID.substr(1);
    //get list path image
    ChatImage.find({ID: ID}, (error, ListImage) => {
        let ListPathImage = [];
        ListImage.forEach( Element => {
            ListPathImage.push(Element.PathImage);
        });
        res.json({ListPathImage: ListPathImage});
    });
}