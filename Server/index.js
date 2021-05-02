const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
mongoose.connect('mongodb://localhost/Chat_Database', {useNewUrlParser: true});
const app = new express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(bodyParser.raw());
app.use(fileUpload());


const LoginController = require('./controllers/LoginController.js');
const RegisterController = require('./controllers/RegisterController.js');
const DeleteController = require('./controllers/DeleteController.js');
const UserManagementController = require('./controllers/UserManagementController.js');
const StoreUser = require('./controllers/StoreUser.js');
const Login = require('./controllers/Login.js');
app.listen(4000,() => {
    console.log("OK, App listening on port 4000");
});
app.use(express.static('public'));

app.get('/', LoginController);

app.post('/Login', Login);

app.get('/Delete', DeleteController);

app.get('/Register', RegisterController);

app.post('/Register/StoreUser', StoreUser);

app.get('/UserManagement', UserManagementController);

const Chat = require('./controllers/Chat.js');
app.get('/chat', Chat);

