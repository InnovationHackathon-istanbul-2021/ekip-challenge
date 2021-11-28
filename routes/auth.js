const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const routes = express.Router();

const { checkAuth, SECRET_KEY } = require('../middleware/auth');

require('../middleware/passport');

routes.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
);

routes.get('/google/callback', passport.authenticate('google'), (req, res) => {
    const { _id } = req.user;

    const userInToken = {
        id: _id,
        cart: [{}]
    };

    const token = jwt.sign(userInToken, SECRET_KEY, {
        expiresIn: '15m',
    });

    res.cookie('token', token, {
        httpOnly: true,
    });


    res.redirect('/'); //FIXME maybe render not redirect
});

routes.get('/logout', checkAuth, (req, res) => {
    res.clearCookie('token').status(200).redirect('/');
});

module.exports = routes;
