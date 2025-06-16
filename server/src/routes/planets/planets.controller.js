const {habitablePlanets} = require('../../model/planets.model');


function getAllPlanets(req, res) {
    console.log('Fetching all planets', habitablePlanets.length, 'habitable planets found.');
    return res.status(200).json(habitablePlanets);
}

module.exports = {
    getAllPlanets
};