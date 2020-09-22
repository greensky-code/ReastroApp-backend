let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let createeditviewPrrofileSchema = new Schema({

    profile_image: String,
    user_detail: {
        type: Schema.Types.ObjectId
    },
    gender_name: String,
    password: String,
    created_at: {
        type: Date, default: Date.now
    },
    updated_at: {
        type: Date, default: Date.now
    },
    uuid: String,
    first_name: String,
    last_name: String,
    gender: String,
    email: String,
    country_code: String,
    mobile: String,
    mobile_verified: Boolean,
    device_token: String,
    is_active: Boolean,
    role: {
        type: Schema.Types.ObjectId
    }
});
mongoose.model('CreateEditViewProfile', createeditviewPrrofileSchema).findOne({ email: "admin@gmail.com" }, (err, res) => {
    if (!res) {
        console.log("Static content  saved succesfully.????");
        let singleObj = {
            first_name: "ADMIN",
            last_name: "ADMIN",
            email: "admin@gmail.com",
            password:"12345678",
            is_active:true,
        }
        mongoose.model('CreateEditViewProfile', createeditviewPrrofileSchema).create(singleObj, (error, success) => {
            if (error)
                console.log("Error is" + error)
            else
                console.log("Static content  saved succesfully.");
        })
    }
});
module.exports = mongoose.model('CreateEditViewProfile', createeditviewPrrofileSchema);