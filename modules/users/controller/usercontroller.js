const createEditViewProfile = require('../model/CreateEditViewProfile')
const permission = require('../../rolemanagement/model/permissions')
const role = require('../../rolemanagement/model/role')
const Validator = require('../../../util/validation').validate_all_request;
const {
    logger,
    responses,
    constants,
    commonFunctions
} = require('../../../util');
const Bcrypt = require("bcryptjs");

//Login API

const login = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    let flag = Validator(req.body, ['email', 'password'])
    if (flag)
        return responses.sendError(res, languageCode, {}, flag[1], flag[0])
    else if (!req.body)
        return responses.sendError(res, languageCode, {}, constants.responseMessageCode.CLIENT_ERROR, constants.responseMessageCode.CLIENT_ERROR)
    else {
        createEditViewProfile.findOne({ email: req.body.email }, (error, resData) => {
            if (error) {
                return responses.sendError(res, languageCode, {}, "INTERNAL SERVER ERROR", constants.responseMessageCode.ERROR_IN_EXECUTION)
            } else if (!resData) {
                return responses.sendError(res, languageCode, {}, "EMAIL NOT_EXISTS", constants.responseMessageCode.EMAIL_NOT_EXISTS)
            } else {
                if (req.body.password == resData.password) {
                    const payload = {
                        userid: resData._id
                    };
                    const accesstoken = commonFunctions.generateJWToken(payload)
                    permission.find({}, (err, perData) => {
                        let perdata = perData
                        console.log(perdata)
                        let resdata = {
                            data: resData,
                            token: accesstoken,
                            permissions: perdata,
                            message:"Logged in successfully.",
                            message_code:"200"
                        }
                        res.json(resdata)
                       // return responses.actionCompleteResponse(res, languageCode, resdata, "Logged in successfully.", constants.responseMessageCode.ACTION_COMPLETE)
                    })

                } else {
                    return responses.sendError(res, languageCode, {}, "INCORRECT PASSWORD", constants.responseMessageCode.INCORRECT_PASSWORD)
                }
            }
        })
    }
}

module.exports = {
    login
}


