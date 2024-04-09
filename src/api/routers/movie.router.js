const router = require("express").Router();
const controller = require("../controllers/movie.controller");
const Auth = require("../../middleware/auth.middleware");

router.post("/", Auth.isAuthenticate, controller.create);
router.delete("/:id", Auth.isAuthenticate, controller.delete);
router.patch("/:id", Auth.isAuthenticate, controller.update);
router.get("/:id", Auth.isAuthenticate, controller.show);
router.get("/", Auth.isAuthenticate, controller.list);
router.post("/import", Auth.isAuthenticate, controller.import);

module.exports = router;
