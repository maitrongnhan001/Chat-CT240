module.exports = (req, res) => {
    req.session.destroy(() => {
        res.redirect('http://localhost:3000');
        })
}