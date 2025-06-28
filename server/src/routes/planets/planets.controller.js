const {getAllPlanets} = require('../../model/planets.model');


function httpGetAllPlanets(req, res) {
    console.log('Fetching all planets', habitablePlanets.length, 'habitable planets found.');
    return res.status(200).json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets
};