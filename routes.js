const { Router } = require('express');
const router = Router();

const user=require('./modules/users')
const role=require('./modules/rolemanagement')
router.use('/api',user)
router.use('/api',role)
module.exports=router


