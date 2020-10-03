const express = require("express");
const router = express.Router();
const cuisinecontroller = require("./controller/cuisinemanagement.controller");
const middleware = require("../middlewares/authMiddleware");
router.post("/cuisines", middleware.auth, cuisinecontroller.insert);
router.get("/cuisines", middleware.auth, cuisinecontroller.list);
router.get("/cuisines/:cuisineid", middleware.auth, cuisinecontroller.getById);
router.put(
  "/cuisines/:cuisineid",
  middleware.auth,
  cuisinecontroller.updateById
);
router.delete(
  "/cuisines/:cuisineid",
  middleware.auth,
  cuisinecontroller.removeById
);
router.post('/filtercuisines',middleware.auth, cuisinecontroller.filterlist)
router.post('/blockcuisine/:id',middleware.auth, cuisinecontroller.blockcuisine)

module.exports = router;
