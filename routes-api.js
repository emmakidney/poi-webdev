const Locations = require('./app/api/locations');
const Users = require("./app/api/users");
const Reviews = require("./app/api/reviews");

module.exports = [
    { method: 'GET', path: '/api/locations', config: Locations.find },
    { method: 'GET', path: '/api/locations/{id}', config: Locations.findOne },
    { method: 'POST', path: '/api/locations', config: Locations.create },
    { method: 'DELETE', path: '/api/locations/{id}', config: Locations.deleteOne },
    { method: 'DELETE', path: '/api/locations', config: Locations.deleteAll },

    { method: "GET", path: "/api/users", config: Users.find },
    { method: "GET", path: "/api/users/{id}", config: Users.findOne },
    { method: "POST", path: "/api/users", config: Users.create },
    { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
    { method: "DELETE", path: "/api/users", config: Users.deleteAll },
    { method: "POST", path: "/api/users/authenticate", config: Users.authenticate },
    { method: "PUT", path: "/api/users/{id}", config: Users.update },

    { method: "GET", path: "/api/reviews", config: Reviews.findAll },

    { method: "GET", path: "/api/locations/{id}/reviews", config: Reviews.findByLocation },
    { method: "POST", path: "/api/locations/{id}/reviews", config: Reviews.makeReview },
    { method: "DELETE", path: "/api/reviews", config: Reviews.deleteAll },

];