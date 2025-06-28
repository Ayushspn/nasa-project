const {getAllLaunches, addNewLaunch, existsLaunchWithId} = require('../../model/launches.model');

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

function httpAbortLaunches(req, res) {
    const id = req.params.id;
    if (!existsLaunchWithId(id)) {
        return res.status(404).json({
            error: 'Launch not found',
        });
    }
    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httGetAllLaunches,
    httAddNewLaunches,
    httpAbortLaunches
};