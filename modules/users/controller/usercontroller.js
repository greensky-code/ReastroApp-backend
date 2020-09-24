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
                            message: "Logged in successfully.",
                            message_code: "200"
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
const forgetpassword = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    createEditViewProfile.findOne({ email: req.body.email }, (error, resData) => {
        if (error) {
            res.json({ "message": "Internal ServerError", message_code: "500" })
        } else if (!resData) {
            res.json({ "message": "Email Not Register", message_code: "404" })
        } else {
            const mailOptions = {
                from: "donotreply@gmail.com", // sender address
                to: req.body.email,
                subject: 'New Message',
                html: "<p>An email has been sent to your registered email id." + "http://localhost:4200/" + resData._id + "</p>"
            };
            commonFunctions.sendEmailNodemailer(mailOptions)
            res.json({ "message": "An email has been sent to your registered email id", message_code: "200" })
        }
    })


}
//Change Password
const changepassword = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.params.id

    let query = {
        _id: userid
    }
    createEditViewProfile.findOne(query, (error, resData) => {
        if (error) {
            res.json({ "message": "Internal ServerError", message_code: "500" })
        } else if (!resData) {
            res.json({ "message": "Email Not Register", message_code: "404" })
        } else {
            let setdata = {
                password: req.body.password
            }
            createEditViewProfile.findOneAndUpdate({ _id: resData._id }, setdata, { new: true }, (err, suc) => {
                if (err) {
                    res.json({ "message": "Internal ServerError", message_code: "500" })
                } else {
                    res.json({ "message": "Password Updated Successfully", message_code: "200" })
                }
            })

        }
    })
}
const updatepassword = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid

    let query = {
        _id: userid
    }
    createEditViewProfile.findOne(query, (error, resData) => {
        if (error) {
            return res.json({ "message": "Internal ServerError", message_code: "500" })
        } else if (!resData) {
            return res.json({ "message": "Email Not Register", message_code: "404" })
        } else {
            if (resData.password == req.body.old_password) {
                let setdata = {
                    password: req.body.new_password
                }
                createEditViewProfile.findOneAndUpdate({ _id: resData._id }, setdata, { new: true }, (err, suc) => {
                    if (err) {
                        return res.json({ "message": "Internal ServerError", message_code: "500" })
                    } else {
                        return res.json({ "message": "Password Updated Successfully", message_code: "200" })
                    }
                })
            }
            else {
                return res.json({ "message": "Incorrect oldpassword", "message_code": 404 })
            }

        }
    })
}
module.exports = {
    login,
    forgetpassword,
    changepassword,
    updatepassword
}


