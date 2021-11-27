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
                callBack(null, currentUser);
            } else {
                const newUser = new User({
                    email: profile._json.email,
                    name: profile.displayName,
                    providerId: profile.id,
                    profilePicture: profile._json.picture,
                    firstName: profile._json.given_name,
                    lastName: profile._json.family_name,
                    provider: profile.provider,
                });

                newUser.save();
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
