const router = require("express").Router();
const controller = require("../controllers/movie.controller");

router.post("/", controller.create);
router.delete("/:id", controller.delete);
router.patch("/:id", controller.update);
router.get("/:id", controller.show);
router.get("/", controller.list);
router.post("/import", controller.import);

module.exports = router;
