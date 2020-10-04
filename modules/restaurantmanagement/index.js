const express = require("express");
const router = express.Router();
const restaurantcontroller = require("./controller/restaurantmanagement.controller");
const middleware = require("../middlewares/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    // cb(null, new Date().toISOString() + file.originalname);
    const now = new Date().toISOString();
    const date = now.replace(/:/g, "-");
    cb(null, date + file.originalname);
  },
});
const upload = multer({ storage: storage });

var companyUpload = upload.fields([
  { name: "registration_certificate", maxCount: 1 },
  { name: "fcci_certificate", maxCount: 1 },
  { name: "company_image", maxCount: 1 },
  { name: "owner_image", maxCount: 1 },
  { name: "verification_id_image", maxCount: 1 },
  { name: "restaurant_image", maxCount: 1 },
  { name: "menu_image", maxCount: 1 },
  { name: "item_image", maxCount: 1 },
  { name: "document_image", maxCount: 1 },
]);
router.post(
  "/restaurant",
  middleware.auth,
  companyUpload,
  restaurantcontroller.insert
);
router.get("/restaurant", middleware.auth, restaurantcontroller.list);
// router.get("/staff/:staffid", middleware.auth, staffcontroller.getById);
// router.put(
//   "/staff/:staffid",
//   middleware.auth,
//   staffcontroller.validateStaff(),
//   staffcontroller.updateById
// );
router.delete(
  "/restaurant/:restaurantid",
  middleware.auth,
  restaurantcontroller.removeById
);
module.exports = router;
