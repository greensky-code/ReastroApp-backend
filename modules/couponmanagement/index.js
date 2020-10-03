const express = require('express');
const router = express.Router();
const  couponcontroller=require('./controller/couponcontroller')
const middleware=require('../middlewares/authMiddleware')
router.post('/addnewcoupon',couponcontroller.addnewcoupon)
router.get('/getallcoupon',couponcontroller.getallcoupon)
router.post('/deletecoupon',couponcontroller.deletecoupon)
router.post('/getcoupondetails', couponcontroller.getcoupondetails)


module.exports = router;