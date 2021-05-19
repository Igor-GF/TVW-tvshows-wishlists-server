const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema ({
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true, unique: true},
  photoUrl: { type: String },
  watchedShows: [{ type: Schema.Types.ObjectId, ref: "Show" }],
  wishLists: [{ type: Schema.Types.ObjectId, ref: "WishList"}],
},{
  timestamps: true,
})

module.exports = model("User", userSchema);