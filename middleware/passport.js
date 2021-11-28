const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userModel = require('../models/user');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'https://stark-reaches-70767.herokuapp.com/api/auth/googe/callback',
        },
        async (accessToken, refreshToken, profile, callBack) => {
            const currentUser = await userModel.findOne({ providerID: profile.id });

            if (currentUser) {
                console.log('this user already exist', currentUser);
                callBack(null, currentUser);
            } else {
                const newUser = new userModel({
                    username: profile.displayName.split(" ").join(''),
                    email: profile._json.email,
                    name: profile.displayName,
                    picture: profile._json.picture,
                    providerID: profile.id
                });

                newUser.save();
                console.log('new user created', newUser);
                callBack(null, newUser);
            }
        }
    )
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});
