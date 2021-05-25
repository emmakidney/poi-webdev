"use strict";

const assert = require("chai").assert;
const ReviewService = require("./review-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("User API tests", function () {
    let users = fixtures.users;
    let newUser = fixtures.newUser;

    const reviewService = new ReviewService(fixtures.reviewService);

    suiteSetup(async function () {
        await reviewService.deleteAllUsers();
        const returnedUser = await reviewService.createUser(newUser);
        const response = await reviewService.authenticate(newUser);
    });

    suiteTeardown(async function () {
        await reviewService.deleteAllUsers();
        reviewService.clearAuth();
    });

    test("create a user", async function () {
        const returnedUser = await reviewService.createUser(newUser);
        assert(_.some([returnedUser], newUser), "returnedUser must be a superset of newUser");
        assert.isDefined(returnedUser._id);
    });

    test("get user", async function () {
        const u1 = await reviewService.createUser(newUser);
        const u2 = await reviewService.getUser(u1._id);
        assert.deepEqual(u1, u2);
    });

    test("get invalid user", async function () {
        const u1 = await reviewService.getUser("1234");
        assert.isNull(u1);
        const u2 = await reviewService.getUser("012345678901234567890123");
        assert.isNull(u2);
    });

    test("delete a user", async function () {
        let u = await reviewService.createUser(newUser);
        assert(u._id != null);
        await reviewService.deleteOneUser(u._id);
        u = await reviewService.getUser(u._id);
        assert(u == null);
    });

    test("get all users", async function () {
        await reviewService.deleteAllUsers();
        await reviewService.createUser(newUser);
        await reviewService.authenticate(newUser);
        for (let u of users) {
            await reviewService.createUser(u);
        }

        const allUsers = await reviewService.getUsers();
        assert.equal(allUsers.length, users.length + 1);
    });

    test("get users detail", async function () {
        await reviewService.deleteAllUsers();
        const user = await reviewService.createUser(newUser);
        await reviewService.authenticate(newUser);
        for (let u of users) {
            await reviewService.createUser(u);
        }

        const testUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
        };
        users.unshift(testUser);
        const allUsers = await reviewService.getUsers();
        for (var i = 0; i < users.length; i++) {
            assert(_.some([allUsers[i]], users[i]), "returnedUser must be a superset of newUser");
        }
    });

    test("get all users empty", async function () {
        await reviewService.deleteAllUsers();
        const user = await reviewService.createUser(newUser);
        await reviewService.authenticate(newUser);
        const allUsers = await reviewService.getUsers();
        assert.equal(allUsers.length, 1);
    });
});