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
app.use(planetRouter);  
app.use(launchesRouter);  
// Move the catch-all route to the end, after all API routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
}); 
module.exports = app;