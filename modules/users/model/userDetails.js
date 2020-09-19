let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({

    dob: String,
    cover_image: String
}, {
        timestamps: true
    });

module.exports = mongoose.model('User_details', UserSchema);