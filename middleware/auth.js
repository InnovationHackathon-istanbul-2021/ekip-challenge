const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

// verify token cookie middleware
const checkAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        const loggedUser = jwt.verify(token, SECRET_KEY);
        req.user = loggedUser;
        console.log('there is token');
        next();
        console.log('token next happened');
    } else {
        res.clearCookie('token').status(401);
        console.log('there is not token');
        next();
        console.log('next is happened');
    }
};

module.exports = {
    checkAuth,
    SECRET_KEY,
};
