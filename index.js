const express = require("express");
const passport = require('passport');
const cookieParser = require('cookie-parser');

require("dotenv").config();

const connectToMongo = require("./database/connection");

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

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    connectToMongo();
});

module.exports = app;
