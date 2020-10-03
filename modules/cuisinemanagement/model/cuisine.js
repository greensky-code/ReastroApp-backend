let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

let cuisineSchema = new Schema({
  created_by: {
    type: Schema.Types.ObjectId,
  },
  updated_by: {
    type: Schema.Types.ObjectId,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  cuisine_name: { type: String, unique: true },
  cuisine_description: { type: String },
  is_active: { type: Boolean, default: true },
  is_delete: {
    type: Boolean,
    default: false,
  },
});
cuisineSchema.plugin(mongooseAggregatePaginate);
cuisineSchema.plugin(AutoIncrement, { inc_field: 'cuisine_id' });
module.exports = mongoose.model("cuisine", cuisineSchema);
