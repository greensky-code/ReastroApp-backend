let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let createeditviewPrrofileSchema = new Schema({

    profile_image:String,
    user_detail:{
     type:Schema.Types.ObjectId
    },
    gender_name:String,
    password:String,
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date. now
    },
    uuid:String,
    first_name:String,
    last_name:String,
    gender:String,
    email:String,
    country_code:String,
    mobile:String,
    mobile_verified:Boolean,
    device_token:String,
    is_active:Boolean,
    role:{
        type:Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('CreateEditViewProfile',createeditviewPrrofileSchema);