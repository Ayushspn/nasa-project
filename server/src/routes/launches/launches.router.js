const express = require('express');
const {httGetAllLaunches, httAddNewLaunches} = require('./launches.controller');
const launchesRouter = express.Router();
launchesRouter.get('/', httGetAllLaunches);
launchesRouter.post('/', httAddNewLaunches);

module.exports = launchesRouter;