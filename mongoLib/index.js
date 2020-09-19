const mongoose = require('mongoose')
const { logger } = require('../util');
require('dotenv').config({ path: 'G:/New Free/dcpfoodadmin/env' });
// require('dotenv').config({ path: '/home/ec2-user/insurex_backend/insurex/env' });




let db = mongoose.connect(process.env.MONGO_URL, {useCreateIndex: true, useNewUrlParser: true}, function (err) {

if (err) throw err;  
logger.log("Successfully connected with "+ process.env.MONGO_URL)



});
module.exports = {
    db
};
