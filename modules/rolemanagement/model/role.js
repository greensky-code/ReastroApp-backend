let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let roleSchema = new Schema({
    id:Number,
    created_by:String,
    updated_by:String,
    name:String,
    created_at:String,
    updated_at:String,
    is_active:Boolean,
    is_corole:Boolean,
    permissions:[{
        type:Schema.Types.ObjectId
    }]    
});
module.exports = mongoose.model('role',roleSchema);