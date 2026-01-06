const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
    }
});

module.exports = mongoose.model("User", UserSchema);