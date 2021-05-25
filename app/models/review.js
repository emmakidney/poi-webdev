"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const reviewSchema = new Schema({
    review: String,
    method: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
    },
});

module.exports = Mongoose.model("Review", reviewSchema);