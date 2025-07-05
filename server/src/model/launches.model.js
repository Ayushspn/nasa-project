const launches = require('./launches.mongoose');
const planets = require('./planets.mongoose');
//const launches = new Map();
const DEFAULT_LAUNCH = 0;
let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customer: ['NASA', 'ZTM'],
    upcoming: true,
    success: true,
}

//launches.set(launch.flightNumber, launch);

async function getAllLaunches() {
    return await launches.find()
}

//save launch to the database

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    });
    if (!planet) {
        throw new Error('No matching planet found for launch target');
    }
    await launches.updateOne(
        {
            flightNumber: launch.flightNumber
        },
        launch,
        {
            upsert: true
        }
    );  
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber();
    const newLaunch = Object.assign(launch,{
        flightNumber: latestFlightNumber + 1,
        upcoming: true,
        success: true,
        customers: ['ZTM', 'NASA'],
        flightNumber: newFlightNumber + 1
    });

    await saveLaunch(newLaunch);
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne().sort('-flightNumber');
    return latestLaunch ? latestLaunch.flightNumber : 100;
}

function existsLaunchWithId(id) {
    return launches.has(id);
}
module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId
}