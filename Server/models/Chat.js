const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ChatSchema = new Schema({
    ListUser: [
        {
            UserName: String
        },
    ],
    ContentChat: [
        {
            UserName: String,
            Content: String,
            Time: Date
        },
    ]
});
const ChatData = mongoose.model('ChatData',ChatSchema);
module.exports = ChatData;