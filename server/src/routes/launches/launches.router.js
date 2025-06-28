const express = require('express');
const {httGetAllLaunches} = require('./launches.controller');
const launchesRouter = express.Router();
launchesRouter.get('/launches', httGetAllLaunches);

module.exports = launchesRouter;