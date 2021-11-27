const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userModel = require('../models/user');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, callBack) => {
            const currentUser = await userModel.findOne({ providerId: profile.id });

            if (currentUser) {
                console.log('this user already exist', currentUser);
                callBack(null, currentUser);
            } else {
                const newUser = new userModel({
                    email: profile._json.email,
                    name: profile.displayName,
                    profilePicture: profile._json.picture,
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
