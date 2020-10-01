let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

let categorySchema = new Schema({
    created_by: {
        type: Schema.Types.ObjectId
    },
    updated_by: {
        type: Schema.Types.ObjectId
    },
    category_name: {type:String,unique:true},
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    status: { type: String, default: "Active" },
    is_delete: {
        type: Boolean,
        default: false
    },
    is_block: {
        type: Boolean,
        default: false
    }
});
categorySchema.plugin(mongooseAggregatePaginate);
categorySchema.plugin(AutoIncrement, {inc_field: 'category_id'});
module.exports = mongoose.model('category', categorySchema);