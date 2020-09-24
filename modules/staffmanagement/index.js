const express = require("express");
const router = express.Router();
const staffcontroller = require("./controller/staffmanagement.controller");
const middleware = require("../middlewares/authMiddleware");
router.post(
  "/staff",
  middleware.auth,
  staffcontroller.validateStaff(),
  staffcontroller.insert
);
router.get("/staff", middleware.auth, staffcontroller.list);
router.get("/staff/:staffid", middleware.auth, staffcontroller.getById);
router.put(
  "/staff/:staffid",
  middleware.auth,
  staffcontroller.validateStaff(),
  staffcontroller.updateById
);
router.delete("/staff/:staffid", middleware.auth, staffcontroller.removeById);
module.exports = router;
