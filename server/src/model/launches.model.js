const launches = require('./launches.mongoose');
//const launches = new Map();

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
    console.log('Saving launch:', launch);
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

function addNewLaunch(launch) {
    console.log('Adding new launch:', launch);
    latestFlightNumber++;
    launch.flightNumber = latestFlightNumber;
    launch.upcoming = true;
    launch.success = true;
    launch.customers = ['ZTM', 'NASA'];
    // Map 'destination' to 'target' for mongoose schema compatibility
    if (launch.destination) {
        launch.target = launch.destination;
        delete launch.destination;
    }
    saveLaunch(launch).catch((err) => {
        console.error('Error saving launch:', err);
    });
}   

function existsLaunchWithId(id) {
    return launches.has(id);
}
module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId
}