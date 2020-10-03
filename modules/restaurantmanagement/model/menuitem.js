let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

let menuSchema = new Schema({
  menu_category: { type: String },
  item_image: { type: String },
  item_name: { type: String },
  food_type: { type: String },
  options: { type: Boolean },
  price: { type: String },
  quantity: { type: String },
  special_price: { type: String },
  suggested_items: { type: String },
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
menuSchema.plugin(AutoIncrement, { inc_field: "menu_id" });
module.exports = mongoose.model("restaurant_menu", menuSchema);
