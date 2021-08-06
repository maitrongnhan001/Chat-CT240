const ChatImage = require("../models/ChatImage.js");
module.exports = (req, res) => {
    if (req.body.ID === undefined) {
        return res.json(null);
    }
    const ID = req.body.ID.slice(1);
    //get list path image
    ChatImage.find({ID: ID}, (error, ListImage) => {
        let ListPathImage = [];
        ListImage.forEach( Element => {
            ListPathImage.push(Element.PathImage);
        });
        res.json({ListPathImage: ListPathImage});
    });
}