module.exports = (req, res) => {
    const MessageData = {
        MessageUserName: '',
        MessagePassword: ''
    }
    res.render('Login', {
        Message: MessageData
    });
};