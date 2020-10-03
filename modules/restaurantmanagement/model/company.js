let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

let addressSchema = new Schema({
  city: { type: String },
  country: { type: String },
  street: { type: String },
  province: { type: String },
  zipcode: { type: String },
});

let ownerSchema = new Schema({
  owner_image: { type: String },
  countrycode: { type: String },
  mobile: { type: String },
  name: { type: String },
  verification_id: { type: String },
  verification_id_image: { type: String },
  verification_id_no: { type: String },
});

let companySchema = new Schema({
  name: { type: String },
  registration_certificate: { type: String },
  registrationNumber: { type: String },
  fcci_certificate: { type: String },
  registration_no: { type: String },
  company_image: { type: String },
  email: { type: String },
  countrycode: { type: String },
  mobile: { type: String },
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
  address: [addressSchema],
  owner: [ownerSchema],
});

companySchema.plugin(AutoIncrement, { inc_field: "company_id" });
module.exports = mongoose.model("company", companySchema);
