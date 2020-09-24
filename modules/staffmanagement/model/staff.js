let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let staffSchema = new Schema({
  created_by: {
    type: Schema.Types.ObjectId,
  },
  updated_by: {
    type: Schema.Types.ObjectId,
  },
  first_name: { type: String },
  middle_name: { type: String },
  last_name: { type: String },
  country_code: { type: String },
  mobile: { type: String },
  email: { type: String },
  role: {
    type: Schema.Types.ObjectId,
  },
  gender: { type: String },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  is_active: { type: Boolean, default: true },
  is_delete: {
    type: Boolean,
    default: false,
  },
  is_block: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("staff", staffSchema);
