"use strict";

const assert = require("chai").assert;
const ReviewService = require("./review-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Review API tests", function () {
    let reviews = fixtures.reviews;
    let newLocation = fixtures.newLocation;
    let newUser = fixtures.newUser;

    const reviewService = new ReviewService(fixtures.reviewService);

    suiteSetup(async function() {
        await reviewService.deleteAllUsers();
        const returnedUser = await reviewService.createUser(newUser);
        const response = await reviewService.authenticate(newUser);
    });

    suiteTeardown(async function() {
        await reviewService.deleteAllUsers();
        reviewService.clearAuth();
    });

    setup(async function () {
        reviewService.deleteAllLocations();
        reviewService.deleteAllReviews();
    });

    teardown(async function () {});

    test("create a review", async function () {
        const returnedLocation = await reviewService.createLocation(newLocation);
        await reviewService.makeReview(returnedLocation._id, reviews[0]);
        const returnedReviews = await reviewService.getReviews(returnedLocation._id);
        console.log(returnedReviews);
        assert.equal(returnedReviews.length, 1);
        assert(_.some([returnedReviews[0]], reviews[0]), "returned review must be a superset of review");
    });
    test("create multiple reviews", async function () {
        const returnedLocation = await reviewService.createLocation(newLocation);
        for (var i = 0; i < reviews.length; i++) {
            await reviewService.makeReview(returnedLocation._id, reviews[i]);
        }

        const returnedReviews = await reviewService.getReviews(returnedLocation._id);
        assert.equal(returnedReviews.length, reviews.length);
        for (var i = 0; i < reviews.length; i++) {
            assert(_.some([returnedReviews[i]], reviews[i]), "returned review must be a superset of review");
        }
    });

    test("delete all reviews", async function () {
        const returnedLocation = await reviewService.createLocation(newLocation);
        for (var i = 0; i < reviews.length; i++) {
            await reviewService.makeReview(returnedLocation._id, reviews[i]);
        }

        const r1 = await reviewService.getReviews(returnedLocation._id);
        assert.equal(r1.length, reviews.length);
        await reviewService.deleteAllReviews();
        const r2 = await reviewService.getReviews(returnedLocation._id);
        assert.equal(r2.length, 0);
    });

    test("create a review and check location", async function () {
        const returnedLocation = await reviewService.createLocation(newLocation);
        await reviewService.makeReview(returnedLocation._id, reviews[0]);
        const returnedReviews = await reviewService.getReviews(returnedLocation._id);
        assert.isDefined(returnedReviews[0].user);

        const users = await reviewService.getUsers();
        assert(_.some([users[0]], newUser), "returnedUser must be a superset of newUser");
    });

});