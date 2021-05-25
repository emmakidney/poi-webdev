"use strict";

const Review = require("../models/review");
const Location = require("../models/location");
const Boom = require("@hapi/boom");
const utils = require("./utils.js");
const Reviews = {

    findByLocation: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const reviews = await Review.find({ location: request.params.id });
            return reviews;
        },
    },

    makeReview: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const userId = utils.getUserIdFromRequest(request);
            let review = new Review(request.payload);
            const location = await Location.findOne({ _id: request.params.id });
            if (!location) {
                return Boom.notFound("No Location with this id");
            }
            review.location = location._id;
            review.user = userId;
            review = await review.save();
            return review;
        },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            await Review.deleteMany({});
            return { success: true };
        },
    },

    findAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const reviews = await Review.find().populate("location").populate("user");
            return reviews;
        },
    }

};

module.exports = Reviews;