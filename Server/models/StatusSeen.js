const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const StatusSeenSchema = new Schema({
   ID: String,
   UserName: String
});
const StatusSeenData = mongoose.model('StatusSeenData',StatusSeenSchema);
module.exports = StatusSeenData;