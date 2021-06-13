const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const StatusOnlineSchema = new Schema({
    UserName: {
        unique: true,
        type: String
    }
});
const StatusOnlineData = mongoose.model('StatusOnlineData', StatusOnlineSchema);
module.exports = StatusOnlineData;