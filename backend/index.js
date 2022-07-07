const express = require("express");
const session = require("express-session");
const passportSetup = require("./passport");
const passport = require("passport");
const app = express();
const cors = require("cors");
const path = require("path");
const authRoute = require("./routes/auth");
require("dotenv").config(path.join(__dirname, ".env"));
const PORT = process.env.PORT || 5000;

app.use(session({
    secret: "index",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use("/auth", authRoute);

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });