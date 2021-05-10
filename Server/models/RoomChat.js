const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const RoomChatSchema = new Schema({
    ContentChat: {
        IDChatRoom: String,
        ListUser: [
            {UserName: String}
        ]
    }
});
const RoomChatData = mongoose.model('RoomChatData',RoomChatSchema);
module.exports = RoomChatData;