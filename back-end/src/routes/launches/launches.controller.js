const {launch} = require('../../models');
const err_vi = require("../../config/err.vi");


exports.getAll = async (req, res) => {
    const launches = await launch.find({}, '-__v');

    res.json({
        result: 'success',
        launches: launches
    });
}


exports.get = async (req, res) => {
    const launchId = req.params.launchId;

    if (launchId == null) {
        res.status(400).json({
            result: 'failed',
            reason: err_vi.ERROR_MISSING_PARAMETERS,
        })
        return;
    }

    const launch = await launch.findOne({id: launchId}, '-__v')

    if (launch) {
        res.json({
            result: 'success',
            launch: launch,
        });
        return;
    } else {
        res.status(404).json({
            result: 'failed',
            reason: err_vi.ERROR_NOT_FOUND
        });
    }

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

    const detail = await launch.create(newLaunch);

    res.status(201).json({
        result: 'success',
        detail: detail,
    })
}


exports.abort = async (req, res) => {
    const _id = req.body._id;

    const result = await launch.updateOne({_id : _id}, {upcoming: false, success: false});

    res.json({
        result: 'success',
        detail: result,
    })
}
