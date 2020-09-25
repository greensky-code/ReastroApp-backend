const express = require("express");
const router = express.Router();
const cuisinecontroller = require("./controller/cuisinemanagement.controller");
const middleware = require("../middlewares/authMiddleware");
router.post("/cuisine", middleware.auth, cuisinecontroller.insert);
router.get("/cuisine", middleware.auth, cuisinecontroller.list);
router.get("/cuisine/:cuisineid", middleware.auth, cuisinecontroller.getById);
router.put(
  "/cuisine/:cuisineid",
  middleware.auth,
  cuisinecontroller.updateById
);
router.delete(
  "/cuisine/:cuisineid",
  middleware.auth,
  cuisinecontroller.removeById
);
module.exports = router;
