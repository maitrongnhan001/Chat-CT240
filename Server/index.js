const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
mongoose.connect('mongodb://localhost/Chat_Database', {useNewUrlParser: true});
app.set('view engine','ejs');
const expressSession = require('express-session');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(bodyParser.raw());
app.use(fileUpload());;
app.use(expressSession({
    secret: 'keyboard cat'
}));

var server = require("http").Server(app);
var io = require("socket.io")(server);


const ChatController = require('./controllers/Chat.js');
io.on('connection', ChatController);

const LoginController = require('./controllers/LoginController.js');
const RegisterController = require('./controllers/RegisterController.js');
const DeleteController = require('./controllers/DeleteController.js');
const UserManagementController = require('./controllers/UserManagementController.js');
const StoreUser = require('./controllers/StoreUser.js');
const Login = require('./controllers/Login.js');

app.use(express.static('public'));

app.get('/', LoginController);

app.post('/Login', Login);

app.get('/Delete', DeleteController);

app.get('/Register', RegisterController);

app.post('/Register/StoreUser', StoreUser);

app.get('/UserManagement', UserManagementController);

const Chat = require('./controllers/Chat.js');
app.get('/chat', Chat);

app.post('/getData', (req, res) => {

});

server.listen(4000, () => {
    console.log("OK. App listening on port 4000");
});