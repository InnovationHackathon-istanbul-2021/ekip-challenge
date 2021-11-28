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
routes.get('/myprofile', (req, res) => {
    /*const { username, email, picture, phone, address, orders } = req.user;
    const clientUser = {
        username: username,
        email: email,
        picture: picture,
        phone: phone,
        address: address,
        orders: orders
    };*/
    /*const clientUser = {
        username: "ayca akyol",
        email: "ayca@mail.com",
        picture: "https://odtukaltev.com.tr/wp-content/uploads/2018/04/person-placeholder.jpg",
        phone: "5553339999",
        address: "gnbgdfkjbnd",
        orders: [
            {totalPrice: 120,
            _id: "77457964758hg9485",
            items:[
                {produceref:13124125,
                quantıty:3
                }
            ]
            },

            {totalPrice: 50,
            _id: "235095fmnbdf"
            }
        ]
    };

    const {name,prıce} = prodcuts[ıtem.productref];

    const products = 
        {
            13124125:{name:chıcken,prıce:40}
            13124125:{name:chıcken,prıce:40}
            13124125:{name:chıcken,prıce:40}
            13124125:{name:chıcken,prıce:40}
            13124125:{name:chıcken,prıce:40}
            13124125:{name:chıcken,prıce:40}
            13124125:{name:chıcken,prıce:40}
        }

    const products = [
        {
            name: "chicken",
            price: 40
        },

        {
            name: "noodle",
            price: 35
        }
    ];*/

    res.status(200).render("auth/profile1", {clientUser: clientUser, products: products});
});

routes.get('/logout', checkAuth, (req, res) => {
    res.clearCookie('token').status(200).redirect('/');
});

module.exports = routes;
