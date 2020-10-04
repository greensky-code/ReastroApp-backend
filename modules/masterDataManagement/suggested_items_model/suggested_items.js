let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const fs = require("fs");
const AutoIncrement = require("mongoose-sequence")(mongoose);

let suggestedItemSchema = new Schema({
  menu_id: { type: Number },
  name: { type: String },
  is_active: {
    type: Boolean,
    default: true,
  },
});

suggestedItemSchema.plugin(AutoIncrement, { inc_field: "suggested_item_id" });
mongoose
  .model("suggestedItems", suggestedItemSchema)
  .findOne({}, (err, res) => {
    if (!res) {
      console.log("Static content  saved succesfully.????");

      const suggestedItemList = fs.readFileSync(
        __dirname + "/suggested_items.json",
        "utf-8"
      );
      JSON.parse(suggestedItemList).map((singleObj) => {
        const data1 = mongoose
          .model("suggestedItems", suggestedItemSchema)
          .create(singleObj, (error, success) => {
            if (error) console.log("Error is" + error);
            else console.log("Static content  saved succesfully.");
          });
      });
    }
  });

module.exports = mongoose.model("suggestedItems", suggestedItemSchema);
