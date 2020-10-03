let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

let bankSchema = new Schema({
  name: { type: String },
  account_number: { type: String },
  ifsc_code: { type: String },
  account_holder_name: { type: String },
  document: { type: String },
  document_image: { type: String },
  restaurant_id: { type: Number },
  company_id: { type: Number },
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
});
bankSchema.plugin(AutoIncrement, { inc_field: "bank_id" });
module.exports = mongoose.model("restaurant_bank", bankSchema);
