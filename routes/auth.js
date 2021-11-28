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
        cart: []
    };

    const token = jwt.sign(userInToken, SECRET_KEY, {
        expiresIn: '1s',
    });

    res.cookie('token', token, {
        httpOnly: true,
    });

    res.redirect('/');
});

// get the current logged in user
routes.get('/myprofile', checkAuth, (req, res) => {
    const { username, email, picture, phone, address, orders } = req.user;
    const clientUser = {
        username: username,
        email: email,
        picture: picture,
        phone: phone,
        address: address,
        orders: orders
    };
    res.status(200).render("views/auth/profile1", {clientUser: clientUser, products: products});
});

routes.get('/logout', checkAuth, (req, res) => {
    res.clearCookie('token').status(200).redirect('/');
});

module.exports = routes;
