const jwt = require('jsonwebtoken');

const validateAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) 
    return res.sendStatus(403)
    jwt.verify(token, JSON.parse(process.env.ADMIN_CRED).algorithm, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
            req.user = user
        next();
    });
};

module.exports = validateAccessToken;
