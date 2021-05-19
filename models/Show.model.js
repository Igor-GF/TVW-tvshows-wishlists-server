const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const showSchema = new Schema ({
  name: { type: String },
  description: { type: String},
  network: { type: String },
  start_date: { type: String },
  status: { type: String },
  image_thumbnail_path: { type: String },
},{
  timestamps: true,
})

module.exports = model("Show", showSchema);