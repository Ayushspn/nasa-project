const {getAllLaunches, scheduleNewLaunch, existsLaunchWithId} = require('../../model/launches.model');

async function httGetAllLaunches(req, res) {
    const launches = await getAllLaunches();
    res.status(200).json(launches);
}

async function httAddNewLaunches(req, res) {
    const launch = req.body;
    // Fix typo from frontend: map 'misssion' to 'mission' if presen
    console.log('Received launch data:', launch);
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
       console.error('Adding new launch:', req.body); 
    await scheduleNewLaunch(req.body);
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