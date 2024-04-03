const router = require("express").Router();
const controller = require("../controllers/session.controller");

router.post("/", controller.login);

module.exports = router;
