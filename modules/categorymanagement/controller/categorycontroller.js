const createEditViewProfile = require('../../users/model/CreateEditViewProfile')
const permission = require('../../rolemanagement/model/permissions')
const category = require('../model/category')
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

const addcategory = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    let query = {
        _id: userid
    }
    createEditViewProfile.findOne({ _id: userid }, (err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error" })
        } else if (!resdata) {
            return res.json({ message_code: "404", message: "Adding Category not allowed" })
        } else {
            async.forEach(req.body.categoryname, (key, callback) => {
                req.body.category_name = key.name
                req.body.created_by = userid
                req.body.updated_by = userid
                category.create(req.body, (error, saverole) => {
                    callback(error, saverole)
                })
            }, function (err1, succ1) {
                if (err1) {
                    res.json({ message_code: "500", message: "Internal_server_error", err: error })
                } else {
                    res.json({ message_code: "200", message: "Category added sucessfully" })
                }
            });
        }
    })
}
const getcategory = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    let query = {
        is_delete: false,
    }
    category.aggregate([{
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
            "category_id": 1,
            "category_name": 1,
            "created_at": 1,
            "updated_at": 1,
            "status": 1,
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
                message: "Category LIST",
                message_code: "200"
            }
            return res.json(data)
        }
    })
}
const getcategorybyid = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    const id = req.params.id
    let query = {
        is_delete: false,
        _id: ObjectId(id)
    }
    category.aggregate([{
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
            "category_id": 1,
            "category_name": 1,
            "created_at": 1,
            "updated_at": 1,
            "status": 1,
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
                message: "Category",
                message_code: "200"
            }
            return res.json(data)
        }
    })
}

const editcategory = (req, res) => {
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
            return res.json({ message_code: "404", message: "Updating Category not allowed" })
        } else {
            let date = new Date()
            let quer = {
                _id: id,
            }
            let set = {
                category_name: req.body.name,
                updated_at: date,
                updated_by: userid
            }
            category.findOneAndUpdate(quer, set, { new: true }, (error, updaterole) => {
                if (error) {
                    if (error.code == 11000) {
                        return res.json({ message_code: "500", message: "Category Name Exist" })
                    }
                    return res.json({ message_code: "500", message: "Internal_server_error", err: error })
                } else {
                    return res.json({ message_code: "200", message: "Category updated sucessfully" })
                }
            })
        }
    })
}
const deletecategory = (req, res) => {
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
            return res.json({ message_code: "404", message: "Deleting category not allowed" })
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
            category.findOneAndUpdate(quer, set, { new: true }, (error, updaterole) => {
                if (error) {
                    return res.json({ message_code: "500", message: "Internal_server_error", err: error })
                } else {
                    return res.json({ message_code: "204" })
                }
            })
        }
    })
}

const searchcategory = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    let query = {
        _id: userid
    }
    createEditViewProfile.findOne(query, (err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error" })
        } else if (!resdata) {
            return res.json({ message_code: "404", message: "Searching Category not allowed" })
        } else {
            //  let search = new RegExp("^" + req.body.search)
            let quer = {}
            console.log(typeof (req.body.search))
            if (isNaN(req.body.search)) {
                let search = new RegExp("^" + req.body.search)
                quer = {
                    category_name: { $regex: search, $options: 'i' },
                    is_delete: false
                }
            } else {
                quer = {
                    category_id: req.body.search,
                    is_delete: false
                }
            }
            console.log(quer)
            category.find(quer, (error, category) => {
                if (error) {
                    return res.json({ message_code: "500", message: "Internal_server_error", err: error })
                } else if (category.length < 1) {
                    return res.json({ message_code: "404", message: "NO DATA FOUND" })
                }
                else {
                    return res.json({ message_code: "200", message: "Search List", data: category })
                }
            })
        }
    })
}
const filtercategory = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    let query = {
        _id: userid
    }
    createEditViewProfile.findOne(query, (err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error" })
        } else if (!resdata) {
            return res.json({ message_code: "404", message: "Searching Category not allowed" })
        } else {
            let quer = {
            }
            if (req.body.status) {
                quer.status = req.body.status
            }
            if (req.body.start && req.body.end) {
                quer.created_at = { "$gte": req.body.start, "$lt": req.body.end }
            }
            category.find(quer, (error, category) => {
                if (error) {
                    return res.json({ message_code: "500", message: "Internal_server_error", err: error })
                } else if (category.length < 1) {
                    return res.json({ message_code: "404", message: "NO DATA FOUND" })
                }
                else {
                    return res.json({ message_code: "200", message: "Search List", data: category })
                }
            })
        }
    })
}
module.exports = {
    addcategory,
    getcategory,
    getcategorybyid,
    editcategory,
    deletecategory,
    searchcategory,
    filtercategory
}