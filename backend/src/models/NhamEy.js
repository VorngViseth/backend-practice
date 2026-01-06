const mongoose = require("mongoose");

const NhamEySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    } 
});

NhamEySchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
    }
});

module.exports = mongoose.model("NhamEy", NhamEySchema);