"use strict";

const Accounts = require("./app/controllers/accounts");
const Dashboard = require("./app/controllers/dashboard");

module.exports = [
    { method: "GET", path: "/", config: Accounts.index },
    { method: "GET", path: "/signup", config: Accounts.showSignup },
    { method: "GET", path: "/login", config: Accounts.showLogin },
    { method: "GET", path: "/logout", config: Accounts.logout },
    { method: "POST", path: "/signup", config: Accounts.signup },
    { method: "POST", path: "/login", config: Accounts.login },
    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },

    { method: "GET", path: "/home", config: Dashboard.home },
    { method: "GET", path: "/report", config: Dashboard.report },
    { method: 'POST', path: '/review', config: Dashboard.review },

    {
        method: "GET",
        path: "/{param*}",
        handler: {
            directory: {
                path: "./public",
            },
        },
        options: { auth: false }
    },
];