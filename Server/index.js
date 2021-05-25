const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
mongoose.connect('mongodb://localhost/Chat_Database', { useNewUrlParser: true });
app.set('view engine', 'ejs');
const expressSession = require('express-session');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.raw());
app.use(fileUpload());;
app.use(expressSession({
    secret: 'keyboard cat'
}));

var server = require("http").Server(app);
var io = require("socket.io")(server);

//socket
const Chat = require('./controllers/Chat.js');
var ArrayUserOnline = ['aaa'];
io.on('connection', Chat);

const ChatController = require('./controllers/Chat.js');
const UserManagementController = require('./controllers/UserManagementController.js');
const StoreUser = require('./controllers/StoreUser.js');
const Login = require('./controllers/Login.js');
const SourceDataChat = require('./controllers/SourceDataChat.js');

//requests
app.use(express.static('public'));

app.post('/Register/Store', StoreUser);

app.get('/UserManagement', UserManagementController);

app.get('/chat', ChatController);

app.post('/api/login', Login);

app.get('/api/sourceDataChat', SourceDataChat);

//listening in port 4000
server.listen(4000, () => {
    console.log("OK. App listening on port 4000");
});