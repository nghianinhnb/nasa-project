const {planet} = require('../../models');


exports.getAll = async (req, res) => {
    res.json(await planet.find({}));
}
