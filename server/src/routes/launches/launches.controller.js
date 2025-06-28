const {getAllLaunches} = require('../../model/launches.model');
function httGetAllLaunches(req, res) {
    res.status(200).json(getAllLaunches());
}

module.exports = {
    httGetAllLaunches,
};