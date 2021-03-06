"use strict";


const env = require('dotenv');
env.config();

const Mongoose = require("mongoose");

async function seed() {
    var seeder = require('mais-mongoose-seeder')(Mongoose);
    const data = require('./seed-data.json');
    const Review = require('./review');
    const Location = require('./location.js');
    const User = require('./user');
    const dbData = await seeder.seed(data, { dropDatabase: false, dropCollections: true });
    console.log(dbData);
}

Mongoose.set("useNewUrlParser", true);
Mongoose.set("useUnifiedTopology", true);

Mongoose.connect(process.env.db);
const db = Mongoose.connection;

db.on("error", function(err) {
    console.log(`database connection error: ${err}`);
});

db.on("disconnected", function() {
    console.log("database disconnected");
});

db.once('open', function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
    seed();
});



