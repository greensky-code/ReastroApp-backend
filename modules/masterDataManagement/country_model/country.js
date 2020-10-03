let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const fs = require("fs");
const AutoIncrement = require("mongoose-sequence")(mongoose);

let countrySchema = new Schema({
  name: { type: String },
  city: { type: String },
  province: { type: String },
  is_active: {
    type: Boolean,
    default: true,
  },
});

countrySchema.plugin(AutoIncrement, { inc_field: "country_id" });
mongoose.model("Countries", countrySchema).findOne({}, (err, res) => {
  if (!res) {
    console.log("Static content  saved succesfully.????");

    const countryList = fs.readFileSync(__dirname + "/country.json", "utf-8");
    JSON.parse(countryList).map((singleObj) => {
      const data1 = mongoose
        .model("Countries", countrySchema)
        .create(singleObj, (error, success) => {
          if (error) console.log("Error is" + error);
          else console.log("Static content  saved succesfully.");
        });
    });
  }
});

module.exports = mongoose.model("Countries", countrySchema);
