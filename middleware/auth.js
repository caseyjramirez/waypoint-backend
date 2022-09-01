function auth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log('not authenticated');
        return res.sendStatus(401)
    }
}

module.exports = auth