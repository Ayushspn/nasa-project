const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const planets = require('./planets.mongoose'); // Assuming planets.mongoose.js exports the mongoose model

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {  
                    // habitablePlanets.push(data);
                    // insert + update = upsert
                  await planets.updateOne({
                    keplerName: data['kepler_name']
                  }, {
                    keplerName: data['kepler_name']
                  },{
                    upsert: true
                  });
                }
            })
            .on('end', () => {
                console.log(`${habitablePlanets.length} habitable planets found.`);
                resolve(habitablePlanets);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

async function getAllPlanets() {
    return await planets.find({}, {
        '__v': 0, // Exclude __v field
        '_id': 0, // Exclude _id field
    });
}

module.exports = {
    loadPlanetsData,
    habitablePlanets,
    getAllPlanets
};