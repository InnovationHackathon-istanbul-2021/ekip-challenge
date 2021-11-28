const express = require("express");
const passport = require('passport');
const cookieParser = require('cookie-parser');

require("dotenv").config();

const connectToMongo = require("./database/connection");
const userModel = require('./models/user');
const { checkAuth } = require('./middleware/auth');

const apiRoutes = require('./routes');

const app = express();
const port = process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.static('assets'));
// app.use('/public', express.static(path.join(__dirname, 'assets')));

app.set("view engine", "ejs");
app.set("views", "views");


app.use('/api', apiRoutes);

app.get("/", checkAuth, async (req, res) => {
    console.log('before render', req.user);
    if (req.user) {
        const user = await userModel.findOne({ _id: req.user.id });

        console.log(user);
        console.log('there is user', req.user);
        console.log(typeof req.user);
        res.render("index.ejs", { user: user });
    } else {
        console.log(typeof req.user);
        console.log('there is no user', req.user);
        res.render("index.ejs");
    }
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    connectToMongo();
});

module.exports = app;
