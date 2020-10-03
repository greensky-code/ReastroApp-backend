const { Router } = require("express");
const router = Router();

const user = require("./modules/users");
const role = require("./modules/rolemanagement");
const category = require("./modules/categorymanagement");
const staff = require("./modules/staffmanagement");
const cuisine = require("./modules/cuisinemanagement");
const pincode = require("./modules/pincode");

router.use("/api", user);
router.use("/api", role);
router.use("/api", category);
router.use("/api", staff);
router.use("/api", cuisine);
router.use("/api", pincode);

module.exports = router;
