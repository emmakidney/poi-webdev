"use strict";

const User = require("../models/user");
const Review = require("../models/review");
const Location = require("../models/location");
const Dashboard = {
    home: {
        handler: async function (request, h) {
            const locations = await Location.find().lean();
            return h.view("home", { title: "Visit Tramore!", locations: locations });
        },
    },
    report: {
        handler: async function (request, h) {
            const reviews = await Review.find().populate("user").populate("location").lean();
            return h.view("report", {
                title: "Reviews to Date",
                dashboard: reviews,
            });
        },
    },
    review: {
        handler: async function (request, h) {
            try {
            const id = request.auth.credentials.id;
            const user = await User.findById(id);
            const data = request.payload;

            const rawLocation = request.payload;
            const location = await Location.find(rawLocation);

            const newReview = new Review({
                review: data.review,
                method: data.method,
                user: user._id,
                location: location._id,
            });
            await newReview.save();
            return h.redirect("/report");
        } catch (err) {
            return h.view("main", { errors: [{ message: err.message}] })};
        }
    },
};

module.exports = Dashboard;