const express = require('express');
const router = express.Router();
const pincodecontroller=require('./controller/pincodecontroller')
const middleware=require("../middlewares/authMiddleware")

router.post('/pinCode',middleware.auth,pincodecontroller.addpincode)
router.get('/pinCode',middleware.auth,pincodecontroller.getpincode)
router.get('/pinCode/:id',middleware.auth,pincodecontroller.getpincodebyid)
router.put('/pinCode/:id',middleware.auth,pincodecontroller.editpincode)
router.delete('/pinCode/:id',middleware.auth,pincodecontroller.deletepincode)
router.post('/filterpinCode',middleware.auth,pincodecontroller.filterpincode)
router.post('/pinCodeEnableDisable',middleware.auth,pincodecontroller.blockpincode)

module.exports = router;

