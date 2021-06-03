const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ChatImageSchema = new Schema({
    ID: String,
    UserName: String,
    PathImage: String,
    Time: Date
});
const ChatImageData = mongoose.model('ChatImageData', ChatImageSchema);
module.exports = ChatImageData;