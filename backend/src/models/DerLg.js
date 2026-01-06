const mongoose = require("mongoose");

const DerLgSchema = new mongoose.Schema({
  id: { type: Number, requiredd: true, unique: true },
  title: { type: String, requiredd: true },
  description: { type: String, requiredd: true },
});

DerLgSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("DerLg", DerLgSchema);
