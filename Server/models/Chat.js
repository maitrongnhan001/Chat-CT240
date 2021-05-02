const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ChatSchema = new Schema({
    ContentChat: [
        {
            UserName: String,
            Content: String
        },
    ]
});
const ChatData = mongoose.model('ChatData',ChatSchema);
module.exports = ChatData;