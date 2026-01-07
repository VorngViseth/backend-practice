const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    user: {
        userId: {
            type: Number, 
            required: true,
            unique: false
        },
        userName: {
            type: String,
            required: true,
            unique: false
        },
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: String,
        publicId: String,
    }
});

CommunitySchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
    }
});

module.exports = mongoose.model("Community", CommunitySchema);