const { Router } = require('express');
const router = Router();
const user=require('./modules/users')

router.use('/user',user)
module.exports = router;
