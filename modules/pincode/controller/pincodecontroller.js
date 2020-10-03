const createEditViewProfile = require('../../users/model/CreateEditViewProfile')
const permission = require('../../rolemanagement/model/permissions')
//const category = require('../model/category')
const pincode = require('../model/pincode')
const Validator = require('../../../util/validation').validate_all_request;
const {
    logger,
    responses,
    constants,
    commonFunctions
} = require('../../../util');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
var async = require("async");

const addpincode = (req, res) => {
    console.log(req.body)
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    let query = {
        _id: userid
    }
    createEditViewProfile.findOne({ _id: userid }, (err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error" })
        } else if (!resdata) {
            return res.json({ message_code: "404", message: "Adding Pincode not allowed" })
        } else {
            req.body.created_by = userid;
            req.body.updated_by = userid;
            pincode.create(req.body, (error, saverole) => {
                if (error) {
                    if (error.code == 11000) {
                        return res.json({
                            message_code: "500",
                            message: "Pin Name Exist",
                            err: error,
                        });
                    }
                    return res.json({
                        message_code: "500",
                        message: "Internal_server_error",
                        err: error,
                    });
                } else {
                    return res.json({
                        message_code: "200",
                        message: "Pin code added sucessfully",
                    });
                }
            });
        }
    })
}
const getpincode = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    let option = {
        page: req.query.page || 1,
        limit: 10,
    }
    let quer = {
        is_delete: false
    }
    if (req.query.search) {
        let search = new RegExp("^" + req.query.search)
        quer.name = { $regex: search, $options: 'i' }
    }
    console.log(quer)
    var aggregate = pincode.aggregate([{
        $match: quer
    },
    {
        $lookup: {
            from: "createeditviewprofiles",
            localField: "created_by",
            foreignField: "_id",
            as: "createdby"
        }
    },

    {
        $lookup: {
            from: "createeditviewprofiles",
            localField: "updated_by",
            foreignField: "_id",
            as: "updatedby",

        }
    },
    {
        $project: {
            "_id": 1,
            "id": 1,
            "name": 1,
            "city": 1,
            "pin_code": 1,
            "created_at": 1,
            "updated_at": 1,
            "is_active": 1,
            "createdby.first_name": 1,
            "createdby.last_name": 1,
            "createdby._id": 1,
            "updatedby.first_name": 1,
            "updatedby.last_name": 1,
            "updatedby._id": 1,

        }
    },
    { $sort: { created_at: -1 } }
    ])
    pincode.aggregatePaginate(aggregate, option, (err, result, pages, total) => {
        if (!err) {
            const success = {
                "docs": result,
                "total": total,
                "limit": option.limit,
                "page": option.page,
                "pages": pages,
            }
            if (success) {
                let data = {
                    results: success.docs,
                    message: "Pin code LIST",
                    message_code: "200",
                    count: success.total
                }
                return res.json(data)

            }
        }
        else {
            return res.json({ message_code: "500", message: "Internal_server_error", err: err })
        }
    })
}
const getpincodebyid = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    const id = req.params.id
    let query = {
        is_delete: false,
        _id: ObjectId(id)
    }
    pincode.aggregate([{
        $match: query
    },
    {
        $lookup: {
            from: "createeditviewprofiles",
            localField: "created_by",
            foreignField: "_id",
            as: "createdby"
        }
    },

    {
        $lookup: {
            from: "createeditviewprofiles",
            localField: "updated_by",
            foreignField: "_id",
            as: "updatedby",

        }
    },
    {
        $project: {
            "_id": 1,
            "id": 1,
            "name": 1,
            "city": 1,
            "pin_code": 1,
            "created_at": 1,
            "updated_at": 1,
            "is_active": 1,
            "createdby.first_name": 1,
            "createdby.last_name": 1,
            "createdby._id": 1,
            "updatedby.first_name": 1,
            "updatedby.last_name": 1,
            "updatedby._id": 1,

        }

    }

    ]).exec((err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error", err: err })
        } else if (!resdata) {
            return res.json({ message_code: "404", message: "No Data Found" })
        } else {
            let data = {
                data: resdata,
                message: "Pin Code",
                message_code: "200"
            }
            return res.json(data)
        }
    })

}

const editpincode = (req, res) => {
    console.log(req.body)
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    const id = req.params.id
    let query = {
        _id: userid
    }
    createEditViewProfile.findOne(query, (err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error" })
        } else if (!resdata) {
            return res.json({ message_code: "404", message: "Updating Pincode not allowed" })
        } else {
            let date = new Date()
            let quer = {
                _id: id,
            }
            let set = {
                name: req.body.name,
                city: req.body.city,
                pin_code: req.body.pin_code,
                updated_at: date,
                updated_by: userid
            }
            pincode.findOneAndUpdate(quer, set, { new: true }, (error, updaterole) => {
                if (error) {
                    if (error.code == 11000) {
                        return res.json({ message_code: "500", message: "Pin code Exist" })
                    }
                    return res.json({ message_code: "500", message: "Internal_server_error", err: error })
                } else {
                    return res.json({ message_code: "200", message: "Pin Code updated sucessfully" })
                }
            })
        }
    })
}
const deletepincode = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    const id = req.params.id
    let query = {
        _id: userid
    }
    createEditViewProfile.findOne(query, (err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error" })
        } else if (!resdata) {
            return res.json({ message_code: "404", message: "Deleting Pin not allowed" })
        } else {
            let date = new Date()
            let quer = {
                _id: id,
            }
            let set = {
                is_delete: true,
                updated_at: date,
                updated_by: userid
            }
            pincode.findOneAndUpdate(quer, set, { new: true }, (error, updaterole) => {
                if (error) {
                    return res.json({ message_code: "500", message: "Internal_server_error", err: error })
                } else {
                    return res.json({ message_code: "204" })
                }
            })
        }
    })
}


const filterpincode = (req, res) => {
    console.log(req.body)
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    let option = {
        page: req.query.page || 1,
        limit: 10,
    }
    let quer = {
        is_delete: false
    }
    if (req.body.status) {
        quer["is_active"] = req.body.status;
    }
    if (req.body.city) {
        quer["city"] = req.body.city
    }
    if (req.body.start) {
        quer["created_at"] = {
            $gte: new Date(req.body.start),
        };
    }
    if (req.body.end) {
        if (quer["created_at"]) {
            quer["created_at"]["$lte"] = new Date(req.body.end);
        } else
            quer["created_at"] = {
                $lte: new Date(req.body.end),
            };
    }
    console.log(quer)
    var aggregate = pincode.aggregate([{
        $match: quer
    },
    {
        $lookup: {
            from: "createeditviewprofiles",
            localField: "created_by",
            foreignField: "_id",
            as: "createdby"
        }
    },

    {
        $lookup: {
            from: "createeditviewprofiles",
            localField: "updated_by",
            foreignField: "_id",
            as: "updatedby",

        }
    },
    {
        $project: {
            "_id": 1,
            "id": 1,
            "name": 1,
            "city": 1,
            "pin_code": 1,
            "created_at": 1,
            "updated_at": 1,
            "is_active": 1,
            "createdby.first_name": 1,
            "createdby.last_name": 1,
            "createdby._id": 1,
            "updatedby.first_name": 1,
            "updatedby.last_name": 1,
            "updatedby._id": 1,

        }
    },
    { $sort: { created_at: -1 } }
    ])
    pincode.aggregatePaginate(aggregate, option, (err, result, pages, total) => {
        if (!err) {
            const success = {
                "docs": result,
                "total": total,
                "limit": option.limit,
                "page": option.page,
                "pages": pages,
            }
            if (success) {
                let data = {
                    results: success.docs,
                    message: "ROLE LIST",
                    message_code: "200",
                    count: success.total
                }
                return res.json(data)

            }
        }
        else {
            return res.json({ message_code: "500", message: "Internal_server_error", err: err })
        }
    })
}
const blockpincode = (req, res) => {
    const languageCode = req.query.languageCode || "en";
    const userid = req.user._id || req.body.userid;
    const id = req.params.id;
    let query = {
        _id: userid,
    };
    createEditViewProfile.findOne(query, (err, resdata) => {
        if (err) {
            return res.json({
                message_code: "500",
                message: "Internal_server_error",
            });
        } else if (!resdata) {
            return res.json({
                message_code: "404",
                message: "Blocking role not allowed",
            });
        } else {
            let date = new Date();
            let quer = {
                _id: id,
            };
            let set = {
                is_active: req.body.block,
                updated_at: date,
                updated_by: userid,
            };
            pincode.findOneAndUpdate(quer, set, { new: true }, (error, updaterole) => {
                if (error) {
                    return res.json({
                        message_code: "500",
                        message: "Internal_server_error",
                        err: error,
                    });
                } else {
                    if (req.body.block) {
                        return res.json({
                            message_code: "200",
                            message: "Unlocked sucessfully",
                        });
                    }
                    return res.json({
                        message_code: "200",
                        message: "Blocked sucessfully",
                    });
                }
            });
        }
    });
}
module.exports = {
    addpincode,
    getpincode,
    getpincodebyid,
    editpincode,
    deletepincode,
    filterpincode,
    blockpincode
}