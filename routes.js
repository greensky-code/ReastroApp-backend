const { Router } = require("express");
const router = Router();

const user = require("./modules/users");
const role = require("./modules/rolemanagement");
const category = require("./modules/categorymanagement");
const staff = require("./modules/staffmanagement");
router.use("/api", user);
router.use("/api", role);
router.use("/api", category);
router.use("/api", staff);
module.exports = router;
