const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new Schema({
    UserName: {
        type: String,
        unique: true
    },
    Password: String,
    PathAvatar: String
});


UserSchema.pre('updateOne', function(next) {
    const user = this;
    bcrypt.hash(user.Password, 10, (error, hash) => {
        user.Password = hash;
        next();
    });
});

UserSchema.pre('save', function(next) {
    const user = this;
    bcrypt.hash(user.Password, 10, (error, hash) => {
        user.Password = hash;
        next();
    });
});

const UserData = mongoose.model('UserData', UserSchema);
module.exports = UserData;