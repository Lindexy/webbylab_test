require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/index");

const userRouter = require("./api/routers/user.router");
const sessionRouter = require("./api/routers/session.router");

const app = express();

app.use(bodyParser.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/sessions", sessionRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started");
    db.sync({ force: false, alter: true })
        .then(() => {
            console.log("db connected");
        })
        .catch((error) => {
            console.log(error);
        });
});
