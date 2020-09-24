const { Router } = require('express');
const router = Router();

const user=require('./modules/users')
const role=require('./modules/rolemanagement')
const category=require('./modules/categorymanagement')
router.use('/api',user)
router.use('/api',role)
router.use('/api',category)
module.exports=router


