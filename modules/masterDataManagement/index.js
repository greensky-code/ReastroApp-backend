const express = require("express");
const router = express.Router();
const masterDataController = require("./controller/masterdata.controller");
const middleware = require("../middlewares/authMiddleware");

router.get("/country", middleware.auth, masterDataController.countryList);
router.get("/menu", middleware.auth, masterDataController.menuList);
router.get("/bank", middleware.auth, masterDataController.bankList);

module.exports = router;
