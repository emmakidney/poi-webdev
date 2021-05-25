"use strict";

const assert = require("chai").assert;
const ReviewService = require("./review-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Location API tests", function () {
    let locations = fixtures.locations;
    let newLocation = fixtures.newLocation;

    const reviewService = new ReviewService(fixtures.reviewService);
    let newUser = fixtures.newUser;

    suiteSetup(async function () {
        await reviewService.deleteAllUsers();
        const returnedUser = await reviewService.createUser(newUser);
        const response = await reviewService.authenticate(newUser);
    });

    suiteTeardown(async function () {
        await reviewService.deleteAllUsers();
        reviewService.clearAuth();
    });

    setup(async function () {
        await reviewService.deleteAllLocations();
    });

    teardown(async function () {
        await reviewService.deleteAllLocations();
    });

    test("create a location", async function () {
        const returnedLocation = await reviewService.createLocation(newLocation);
        assert(_.some([returnedLocation], newLocation), "returnedLocation must be a superset of newLocation");
        assert.isDefined(returnedLocation._id);
    });

    test("get location", async function () {
        const c1 = await reviewService.createLocation(newLocation);
        const c2 = await reviewService.getLocation(c1._id);
        assert.deepEqual(c1, c2);
    });

    test("get invalid location", async function () {
        const c1 = await reviewService.getLocation("1234");
        assert.isNull(c1);
        const c2 = await reviewService.getLocation("012345678901234567890123");
        assert.isNull(c2);
    });

    test("delete a location", async function () {
        let c = await reviewService.createLocation(newLocation);
        assert(c._id != null);
        await reviewService.deleteOneLocation(c._id);
        c = await reviewService.getLocation(c._id);
        assert(c == null);
    });

    test("get all locations", async function () {
        for (let c of locations) {
            await reviewService.createLocation(c);
        }

        const allLocations = await reviewService.getLocations();
        assert.equal(allLocations.length, locations.length);
    });

    test("get locations detail", async function () {
        for (let c of locations) {
            await reviewService.createLocation(c);
        }

        const allLocations = await reviewService.getLocations();
        for (var i = 0; i < locations.length; i++) {
            assert(_.some([allLocations[i]], locations[i]), "returnedCandidate must be a superset of newCandidate");
        }
    });

    test("get all locations empty", async function () {
        const allLocations= await reviewService.getLocations();
        assert.equal(allLocations.length, 0);
    });
});