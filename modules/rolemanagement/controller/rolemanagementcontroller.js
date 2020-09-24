const createEditViewProfile = require('../../users/model/CreateEditViewProfile')
const permission = require('../model/permissions')
const role = require('../model/role')
const Validator = require('../../../util/validation').validate_all_request;
const {
    logger,
    responses,
    constants,
    commonFunctions
} = require('../../../util');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

//Add Role
const addRole = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    let query = {
        _id: userid
    }
    createEditViewProfile.findOne({ _id: userid }, (err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error" })
        } else if (!resdata) {
            return res.json({ message_code: "404", message: "Adding role not allowed" })
        } else {
            req.body.created_by = userid
            req.body.updated_by = userid
            role.create(req.body, (error, saverole) => {
                if (error) {
                    if (error.code == 11000) {
                        return res.json({ message_code: "500", message: "Role Name Exist", err: error })
                    }
                    return res.json({ message_code: "500", message: "Internal_server_error", err: error })
                } else {
                    return res.json({ message_code: "200", message: "Role added sucessfully" })
                }
            })
        }
    })
}
const getpermission = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    let query = {
        _id: userid
    }
    permission.find({}, (err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error" })
        } else if (resdata.length < 1) {
            return res.json({ message_code: "404", message: "No Data Found" })
        } else {
            return res.json(resdata)
        }
    })
}

const getrole = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    let option = {
        page: req.query.page || 1,
        limit: 10,
    }
    let quer = {
        is_delete: false
    }
    if(req.query.search){
        let search = new RegExp("^" + req.query.search)
        quer.name={ $regex: search, $options: 'i' }
    }
    console.log(quer)
    var aggregate = role.aggregate([{
        $match: quer
    },
    {
        $lookup: {
            from: "permissions",
            localField: "permissions",
            foreignField: "_id",
            as: "Permission"
        }
    }, {
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
    },{
      $project:{
          "updatedby.password":0,
          "createdby.password":0
      }   
    },
    { $sort: { created_at: -1 } }
    ])
    role.aggregatePaginate(aggregate, option, (err, result, pages, total) => {
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
const getrolebyid = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    const roleid = req.params.id
    let query = {
        is_delete: false,
        _id: ObjectId(roleid)
    }
    role.aggregate([{
        $match: query
    },
    {
        $lookup: {
            from: "permissions",
            localField: "permissions",
            foreignField: "_id",
            as: "Permission"
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
                message: "ROLE LIST",
                message_code: "200"
            }
            return res.json(data)
        }
    })
}
const editrole = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    const roleid = req.params.id
    let query = {
        _id: userid
    }
    createEditViewProfile.findOne(query, (err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error" })
        } else if (!resdata) {
            return res.json({ message_code: "404", message: "Updating role not allowed" })
        } else {
            let date = new Date()
            let quer = {
                _id: roleid,
            }
            let set = {
                name: req.body.name,
                permissions: req.body.permissions,
                updated_at: date,
                updated_by: userid
            }
            role.findOneAndUpdate(quer, set, { new: true }, (error, updaterole) => {
                if (error) {
                    if (error.code == 11000) {
                        return res.json({ message_code: "500", message: "Role Name Exist", err: error })
                    }
                    return res.json({ message_code: "500", message: "Internal_server_error", err: error })
                } else {
                    return res.json({ message_code: "200", message: "Role updated sucessfully" })
                }
            })
        }
    })
}

const blockrole = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    const roleid = req.params.id
    let query = {
        _id: userid
    }
    createEditViewProfile.findOne(query, (err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error" })
        } else if (!resdata) {
            return res.json({ message_code: "404", message: "Blocking role not allowed" })
        } else {
            let date = new Date()
            let quer = {
                _id: roleid,
            }
            let set = {
                is_block: req.body.block,
                updated_at: date,
                updated_by: userid
            }
            role.findOneAndUpdate(quer, set, { new: true }, (error, updaterole) => {
                if (error) {
                    if (error.code == 11000) {
                        return res.json({ message_code: "500", message: "Role Name Exist", err: error })
                    }
                    return res.json({ message_code: "500", message: "Internal_server_error", err: error })
                } else {
                    if(req.body.block){
                        return res.json({ message_code: "200", message: "Role  Blocked sucessfully" })
                    }
                    return res.json({ message_code: "200", message: "Role  Unblocked sucessfully" })
                }
            })
        }
    })
}

const deleterole = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    const roleid = req.params.id
    let query = {
        _id: userid
    }
    createEditViewProfile.findOne(query, (err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error" })
        } else if (!resdata) {
            return res.json({ message_code: "404", message: "Blocking role not allowed" })
        } else {
            let date = new Date()
            let quer = {
                _id: roleid,
            }
            let set = {
                is_delete: true,
                updated_at: date,
                updated_by: userid
            }
            role.findOneAndUpdate(quer, set, { new: true }, (error, updaterole) => {
                if (error) {
                    return res.json({ message_code: "500", message: "Internal_server_error", err: error })
                } else {
                    return res.json({ message_code: "204" })
                }
            })
        }
    })
}
const searchrole = (req, res) => {
    const languageCode = req.query.languageCode || 'en';
    const userid = req.user._id || req.body.userid
    let query = {
        _id: userid
    }
    createEditViewProfile.findOne(query, (err, resdata) => {
        if (err) {
            return res.json({ message_code: "500", message: "Internal_server_error" })
        } else if (!resdata) {
            return res.json({ message_code: "404", message: "Searching role not allowed" })
        } else {
            let search = new RegExp("^" + req.body.name)
            let quer = {
                name: { $regex: search, $options: 'i' }
            }
            role.find(quer, (error, role) => {
                if (error) {
                    return res.json({ message_code: "500", message: "Internal_server_error", err: error })
                } else if (role.length < 1) {
                    return res.json({ message_code: "404", message: "NO DATA FOUND" })
                }
                else {
                    return res.json({ message_code: "200", message: "Search List", data: role })
                }
            })
        }
    })
}
module.exports = {
    addRole,
    getpermission,
    getrole,
    getrolebyid,
    editrole,
    blockrole,
    deleterole,
    searchrole
}