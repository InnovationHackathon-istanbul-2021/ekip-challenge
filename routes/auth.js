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
    const { _id, name, email, profilePicture } = req.user;

    const userInToken = {
        id: _id,
        name: name,
        email: email,
        profilePicture: profilePicture,
    };

    const token = jwt.sign(userInToken, SECRET_KEY, {
        expiresIn: '1h',
    });

    res.cookie('token', token, {
        httpOnly: true,
    });

    res.redirect('/');
});

// get the current logged in user
routes.get('/myprofile', checkAuth, (req, res) => {
    const { name, email, profilePicture } = req.user;
    const clientUser = {
        name: name,
        email: email,
        profilePicture: profilePicture,
    };
    res.status(200).json(clientUser);
});

routes.get('/logout', checkAuth, (req, res) => {
    res.clearCookie('token').sendStatus(200).redirect('/');
});

module.exports = routes;
