'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const locationSchema = Schema({
    location: String,
});

module.exports = Mongoose.model('location', locationSchema);