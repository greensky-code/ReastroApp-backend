let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

let pincodeSchema = new Schema({
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
    city: { type: String},
    pin_code:{type:Number,unique:true},
    is_delete: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    }
});
pincodeSchema.plugin(mongooseAggregatePaginate);
pincodeSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('pincode', pincodeSchema);