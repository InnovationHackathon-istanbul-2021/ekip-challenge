const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

// verify token cookie middleware
const checkAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        console.log('there is token before');
        const loggedUser = jwt.verify(token, SECRET_KEY);
        if (loggedUser) {
            req.user = loggedUser;
            next();
            console.log('there is token');
            console.log('token next happened');
        } else {
            console.log('its here before redirecting');
            res.status(422).json('invalid / expired token, redirecting...').redirect('/');
        }
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
