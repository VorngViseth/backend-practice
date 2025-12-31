const mongoose = require("mongoose");

const DerLgSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  tittle: { type: String, required: true },
  description: { type: String, required: true },
});

DerLgSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("DerLg", DerLgSchema);
