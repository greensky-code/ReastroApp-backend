let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const fs = require("fs");
const AutoIncrement = require("mongoose-sequence")(mongoose);

let menuSchema = new Schema({
  name: { type: String },
  is_active: {
    type: Boolean,
    default: true,
  },
});

menuSchema.plugin(AutoIncrement, { inc_field: "menu_item_id" });
mongoose.model("Menu", menuSchema).findOne({}, (err, res) => {
  if (!res) {
    console.log("Static content  saved succesfully.????");

    const MenuList = fs.readFileSync(__dirname + "/menu.json", "utf-8");
    JSON.parse(MenuList).map((singleObj) => {
      const data1 = mongoose
        .model("Menu", menuSchema)
        .create(singleObj, (error, success) => {
          if (error) console.log("Error is" + error);
          else console.log("Static content  saved succesfully.");
        });
    });
  }
});

module.exports = mongoose.model("Menu", menuSchema);
