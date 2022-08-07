const jwt = require('jsonwebtoken');
const {user} = require('../../../models');
const err_vi = require('../../../config/err.vi');
const authHelper = require('../../../utils/authHelpers');


exports.me = async (req, res) => {
    const id = req.user.id;
    const me = await user.find({id: id}, 'name email');

    res.json({
        result: 'success',
        user: me,
    });
};


exports.register = async (req, res) => {
    const {email, password, name} = req.body;

    if (!email || !password || !name) {
        res.status(400).json({
            result: 'failed',
            reason: err_vi.ERROR_MISSING_PARAMETERS,
        });
        return
    }

    const salt = authHelper.generateSalt(10);
    const hashedPassword = authHelper.hashPassword(password, salt);

    await user.create( {email, name, hashedPassword, salt},
        (err, user) => {
            if (err) {
                res.status(409).json({
                    result: 'failed',
                    reason: err_vi.ERROR_ACCOUNT_EXISTS,
                });
                return
            } 

            const {email, name} = user;
            res.status(201).json({
                result: 'success',
                detail: {email, name},
            });
        }
    )
}


exports.signIn = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400).json({
            result: 'failed',
            reason: err_vi.ERROR_MISSING_PARAMETERS,
        });
        return
    }

    const thisUser = await user.findOne({email}, '-__v',
        {
            if (err) {
                res.status(500).json({
                    result: 'failed',
                    err: err,
                    reason: err_vi.ERROR_INTERNAL,
                });
                return
            }
        }
    );

    if (!thisUser || thisUser.hashedPassword != authHelper.hashPassword(password, thisUser.salt)) {
        res.status(404).json({
            result: 'failed',
            reason: err_vi.ERROR_WRONG_PASSWORD,
        });
        return
    }

    res.json({
        result: 'success',
        detail: {name: thisUser.name, email: thisUser.email},
        accessToken: authHelper.generateAccessToken(thisUser.id),
        refreshToken: authHelper.generateRefreshToken(),
    })
}


exports.refreshToken = async (req, res) => {
    const {refreshToken} = req.body;

    // Verify request
    if (!refreshToken) {
        res.status(400).json({
            result: 'failed',
            err: 'ERROR_MISSING_PARAMETERS',
            reason: err_vi.ERROR_MISSING_PARAMETERS,
        })
        return
    }

    // Verify token
    const verified = authHelper.verifyRefreshToken(refreshToken);

    if (!verified) {
        res.status(404).json({
            result: 'failed',
            err: 'ERROR_NOT_FOUND',
            reason: err_vi.ERROR_NOT_FOUND,
        })
        return
    }

    // Generrate new access token and refresh token then send to client.
    // Store refresh token to user table.
    try {
        const userId = await user.findOne({refreshToken: refreshToken}, 'id');

        if (!userId) {
            res.status(404).json({
                result: 'failed',
                err: 'ERROR_NOT_FOUND',
                reason: err_vi.ERROR_NOT_FOUND,
            })
            return
        }

        const newAccessToken = authHelper.generateAccessToken(userId);
        const newRefreshToken = authHelper.generateRefreshToken(verified.exp);

        await user.updateOne({id: userId}, {refreshToken: newRefreshToken});

        res.json({
            result: 'success',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        })

    } catch(err) {
        res.status(500).json({
            result: 'failed',
            err: 'ERROR_INTERNAL',
            reason: err_vi.ERROR_INTERNAL,
        })
    }
}
