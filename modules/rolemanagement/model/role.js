let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let roleSchema = new Schema({
    created_by: {
        type: Schema.Types.ObjectId
    },
    updated_by: {
        type: Schema.Types.ObjectId
    },
    name: {type:String,unique:true},
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    is_active: { type: Boolean, default: true },
    is_corole: { type: Boolean, default: false },
    permissions: [{
        type: Schema.Types.ObjectId
    }],
    is_delete: {
        type: Boolean,
        default: false
    },
    is_block: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('role', roleSchema);