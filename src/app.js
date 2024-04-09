require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const db = require("./db/index");

const userRouter = require("./api/routers/user.router");
const sessionRouter = require("./api/routers/session.router");
const movieRouter = require("./api/routers/movie.router");

const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/sessions", sessionRouter);
app.use("/api/v1/movies", movieRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started");
    db.sync({
        // force: true,
        //  alter: false
    })
        .then(() => {
            console.log("db connected");
        })
        .catch((error) => {
            console.log(error);
        });
});
