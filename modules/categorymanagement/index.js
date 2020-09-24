const express = require('express');
const router = express.Router();
const categorycontroller=require('./controller/categorycontroller')
const middleware=require("../middlewares/authMiddleware")

router.post('/category',middleware.auth,categorycontroller.addcategory)
router.get('/category',middleware.auth,categorycontroller.getcategory)
router.get('/category/:id',middleware.auth,categorycontroller.getcategorybyid)
router.put('/category/:id',middleware.auth,categorycontroller.editcategory)
router.delete('/category/:id',middleware.auth,categorycontroller.deletecategory)
router.post('/searchcategory',middleware.auth,categorycontroller.searchcategory)
router.post('/filtercategory',middleware.auth,categorycontroller.filtercategory)
module.exports = router;

