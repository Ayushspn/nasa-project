const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const planetRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');
const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(morgan('combined')); // Logging middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.use(planetRouter);  
app.use(launchesRouter);  
module.exports = app;