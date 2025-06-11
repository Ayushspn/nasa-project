const express = require('express');
const { get } = require('../../app');

const planetRouter = express.Router();

planetRouter.get('/', getPlanets) 

module.exports = planetRouter;