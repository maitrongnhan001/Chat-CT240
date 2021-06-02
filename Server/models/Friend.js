const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const FriendSchema = new Schema({
    UserName: {
        unique: true,
        type: String
    },
    ListFriend: [
        {UserName: String}
    ]
});
const FriendData = mongoose.model('FriendData', FriendSchema);
module.exports = FriendData;