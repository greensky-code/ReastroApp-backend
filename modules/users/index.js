const express = require('express');
const router = express.Router();
const usercontroller=require('./controller/usercontroller')
const middleware=require('../middlewares/authMiddleware')
router.post('/login',usercontroller.login)
router.post('/sent-forget-password-email',usercontroller.forgetpassword)
router.post('/resetpassword/:id',usercontroller.changepassword)
router.post('/change-password',middleware.auth,usercontroller.updatepassword)
module.exports = router;

