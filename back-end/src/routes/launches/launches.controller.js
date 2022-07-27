const {launch} = require('../../models');
const err_vi = require("../../config/err.vi");


exports.getAll = async (req, res) => {
    res.json(await launch.find({}, '-__v'));
}


exports.get = async (req, res) => {
    const launchId = req.params.launchId;

    if (launchId == null) {
        res.status(400).json({
            result: 'failed',
            reason: err_vi.ERROR_MISSING_PARAMETERS,
        })
    }

    res.json( await launch.findOne({id: launchId}, '-__v') );
}


exports.create = async (req, res) => {
    const newLaunch = {
        flightNumber: Math.floor(Math.random() * 100),
        launchDate: req.body.launchDate,
        mission: req.body.mission,
        rocket: req.body.rocket,
        target: req.body.target,
        customers: ['ZTM', 'VN'],
    };

    const result = await launch.create(newLaunch);

    res.status(201).json({
        result: 'success',
        detail: result,
    })
}


exports.delete = async (req, res) => {
    const id = req.body.id;
    
    const result = await launch.updateOne({id : id}, {upcoming: false, success: false});

    res.json({
        result: 'success',
        detail: result,
    })
}
