const express = require('express');
const {httGetAllLaunches, 
    httAddNewLaunches,
    httpAbortLaunches   
    } = require('./launches.controller');
const launchesRouter = express.Router();
launchesRouter.get('/', httGetAllLaunches);
launchesRouter.post('/', httAddNewLaunches);
launchesRouter.delete('/:id', httpAbortLaunches);

module.exports = launchesRouter;