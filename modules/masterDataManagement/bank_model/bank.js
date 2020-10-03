let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const fs = require("fs");
const AutoIncrement = require("mongoose-sequence")(mongoose);

let bankSchema = new Schema({
  name: { type: String },
  is_active: {
    type: Boolean,
    default: true,
  },
});

bankSchema.plugin(AutoIncrement, { inc_field: "bank_item_id" });
mongoose.model("banks", bankSchema).findOne({}, (err, res) => {
  if (!res) {
    console.log("Static content  saved succesfully.????");

    const bankList = fs.readFileSync(__dirname + "/bank.json", "utf-8");
    JSON.parse(bankList).map((singleObj) => {
      const data1 = mongoose
        .model("banks", bankSchema)
        .create(singleObj, (error, success) => {
          if (error) console.log("Error is" + error);
          else console.log("Static content  saved succesfully.");
        });
    });
  }
});

module.exports = mongoose.model("banks", bankSchema);
