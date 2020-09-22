const express = require('express');
const router = express.Router();
const rolecontroller=require('./controller/rolemanagementcontroller')
const middleware=require("../middlewares/authMiddleware")
router.post('/role',middleware.auth,rolecontroller.addRole)
router.get('/role',middleware.auth,rolecontroller.getrole)
router.get('/role/:id',middleware.auth,rolecontroller.getrolebyid)
router.put('/role/:id',middleware.auth,rolecontroller.editrole)
router.put('/blockrole/:id',middleware.auth,rolecontroller.blockrole)
router.delete('/role/:id',middleware.auth,rolecontroller.deleterole)
router.post('/searchrole',middleware.auth,rolecontroller.searchrole)
router.get('/permissions',middleware.auth,rolecontroller.getpermission)

module.exports = router;

