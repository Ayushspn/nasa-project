const {getAllLaunches, addNewLaunch} = require('../../model/launches.model');

function httGetAllLaunches(req, res) {
    res.status(200).json(getAllLaunches());
}

function httAddNewLaunches(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket 
        || !launch.launchDate || !launch.destination) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    launch.launchDate.toString() === 'Invalid Date' && 
        res.status(400).json({
            error: 'Invalid launch date',
        }); 
    addNewLaunch(req.body);
    return res.status(201).json(launch);
}

module.exports = {
    httGetAllLaunches,
    httAddNewLaunches
};