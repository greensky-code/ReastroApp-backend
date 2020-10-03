let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
const AutoIncrement = require("mongoose-sequence")(mongoose);

let addressSchema = new Schema({
  city: { type: String },
  country: { type: String },
  street: { type: String },
  province: { type: String },
  zipcode: { type: String },
  zone: { type: String },
});

let operationHourSchema = new Schema({
  mon: { type: Object },
  tue: { type: Object },
  wed: { type: Object },
  thu: { type: Object },
  fri: { type: Object },
  sat: { type: Object },
  sun: { type: Object },
});

let restaurantSchema = new Schema({
  company_id: { type: Number },
  name: { type: String },
  delivery_time: { type: String },
  email: { type: String },
  countrycode: { type: String },
  mobile: { type: String },
  menu_image: { type: String },
  restaurant_image: { type: String },
  mobile: { type: String },
  cuisine: { type: String },
  cost_per_person: { type: Number },
  address: [addressSchema],
  operation_hours: [operationHourSchema],
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
  is_delete: {
    type: Boolean,
    default: false,
  },
  approval_status: {
    type: String,
    default: "pending",
  },
});
restaurantSchema.plugin(mongooseAggregatePaginate);
restaurantSchema.plugin(AutoIncrement, { inc_field: "restaurant_id" });
module.exports = mongoose.model("restaurant", restaurantSchema);
