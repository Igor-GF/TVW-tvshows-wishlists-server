const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const wishListSchema = new Schema ({
  listName: { type: String },
  shows: [{ type: Schema.Types.ObjectId, ref: "Show"}],
  owner: { type: Schema.Types.ObjectId, ref: "User"},
},{
  timestamps: true,
})

module.exports = model("WishList", wishListSchema);