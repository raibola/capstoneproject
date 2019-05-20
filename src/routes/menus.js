const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController")

router.get("/menu", menuController.index);
router.get("/menu/new", menuController.new);
router.post("/menu/create", menuController.create);
router.get("/menu/:id", menuController.show);
router.post("/menu/:id/destroy", menuController.destroy);
router.get("/menu/:id/edit", menuController.edit);
router.post("/menu/:id/update", menuController.update);

module.exports = router;