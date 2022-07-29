const {planet} = require('../../models');


exports.getAll = async (req, res) => {
    const planets = await planet.find({})
    res.json({
        result: 'success',
        planets: planets,
    });
}
