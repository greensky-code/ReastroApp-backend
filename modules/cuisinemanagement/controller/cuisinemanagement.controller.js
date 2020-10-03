const cuisine = require("../model/cuisine");
const createEditViewProfile = require("../../users/model/CreateEditViewProfile");
const { body, check } = require("express-validator/check");
const { validationResult } = require("express-validator/check");
const {
  QueryList,
} = require("twilio/lib/rest/preview/understand/assistant/query");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.insert = (req, res) => {
  try {
    const languageCode = req.query.languageCode || "en";
    const userid = req.user._id || req.body.userid;
    let query = {
      _id: userid,
    };
    req.body.created_by = userid;
    req.body.updated_by = userid;
    console.log(req.body);
    cuisine.create(req.body, (error, savecuisine) => {
      console.log(error);
      if (error) {
        if (error.code == 11000) {
          return res.json({
            message_code: "500",
            message: "Cuisine already Exist",
            err: error,
          });
        } else {
          return res.json({
            message_code: "500",
            message: "Internal_server_error",
          });
        }
      }
      return res.json({
        message_code: "200",
        message: "cuisine added sucessfully",
      });
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.list = (req, res) => {
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
    quer.cuisine_name = { $regex: search, $options: 'i' }
  }
  console.log(quer)
  var aggregate = cuisine
    .aggregate([
      {
        $match: quer,
      },
      {
        $lookup: {
          from: "createeditviewprofiles",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
        },
      },
      {
        $lookup: {
          from: "createeditviewprofiles",
          localField: "updated_by",
          foreignField: "_id",
          as: "updated_by",
        },
      },
      {
        $project: {
          "created_by.password": 0,
          "created_by.created_at": 0,
          "created_by.updated_at": 0,
          "created_by.is_active": 0,
          "updated_by.password": 0,
          "updated_by.created_at": 0,
          "updated_by.updated_at": 0,
          "updated_by.is_active": 0,
        },
      },
      { $sort: { created_at: -1 } },
    ])
  cuisine.aggregatePaginate(aggregate, option, (err, result, pages, total) => {
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
};

exports.getById = (req, res) => {
  const languageCode = req.query.languageCode || "en";
  const cuisineid = req.params.cuisineid;
  let query = {
    is_delete: false,
    _id: ObjectId(cuisineid),
  };
  cuisine
    .aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "createeditviewprofiles",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
        },
      },
      {
        $lookup: {
          from: "createeditviewprofiles",
          localField: "updated_by",
          foreignField: "_id",
          as: "updated_by",
        },
      },
      {
        $project: {
          "created_by.password": 0,
          "created_by.created_at": 0,
          "created_by.updated_at": 0,
          "created_by.is_active": 0,
          "updated_by.password": 0,
          "updated_by.created_at": 0,
          "updated_by.updated_at": 0,
          "updated_by.is_active": 0,
        },
      },
      { $sort: { created_at: -1 } },
    ])
    .exec((err, resdata) => {
      if (err) {
        return res.json({
          message_code: "500",
          message: "Internal_server_error",
        });
      } else if (!resdata || resdata.length < 1) {
        return res.json({ message_code: "404", message: "No Data Found" });
      } else {
        let data = {
          data: resdata,
          message: "cuisne",
          message_code: "200",
        };
        return res.json(data);
      }
    });
};

exports.updateById = (req, res) => {
  const userid = req.user._id || req.body.userid;
  const cuisineid = req.params.cuisineid;
  let quer = {
    _id: cuisineid,
  };
  let date = new Date();
  let set = {
    cuisine_name: req.body.cuisine_name,
    cuisine_description: req.body.cuisine_description,
    updated_at: date,
    updated_by: userid,
  };
  if (req.body.is_active != undefined) {
    if (req.body.is_active) {
      set["is_active"] = true;
    } else {
      set["is_active"] = false;
    }
  }
  cuisine.findOneAndUpdate(quer, set, { new: true }, (error, updaterole) => {
    if (error) {
      if (error.code == 11000) {
        return res.json({
          message_code: "500",
          message: "Cuisine already Exist",
          err: error,
        });
      } else {
        return res.json({
          message_code: "500",
          message: "Internal_server_error",
          err: error,
        });
      }
    } else {
      return res.json({
        message_code: "200",
        message: "Cuisine updated sucessfully",
      });
    }
  });
};

exports.removeById = (req, res) => {
  const userid = req.user._id || req.body.userid;
  const cuisineid = req.params.cuisineid;
  let date = new Date();
  let query = {
    _id: cuisineid,
  };
  let set = {
    is_delete: true,
    is_active: false,
    updated_at: date,
    updated_by: userid,
  };
  cuisine.findOneAndUpdate(query, set, { new: true }, (error, updaterole) => {
    if (error) {
      return res.json({
        message_code: "500",
        message: "Internal_server_error",
        err: error,
      });
    } else {
      return res.json({ message_code: "204" });
    }
  });
};


exports.filterlist = (req, res) => {
  const languageCode = req.query.languageCode || 'en';
  const userid = req.user._id || req.body.userid
  let option = {
    page: req.query.page || 1,
    limit: 10,
  }
  let quer = {
    is_delete: false
  }
  // quer.$or = [
  //   { is_active: req.body.status },
  //   {
  //     created_at: {
  //       $gte: req.body.start,
  //       $lt: req.body.end
  //     }
  //   }
  // ]
  if (req.body.status) {
    quer["is_active"] = req.body.status;
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
  console.log(quer)
  var aggregate = cuisine
    .aggregate([
      {
        $match: quer,
      },
      {
        $lookup: {
          from: "createeditviewprofiles",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
        },
      },
      {
        $lookup: {
          from: "createeditviewprofiles",
          localField: "updated_by",
          foreignField: "_id",
          as: "updated_by",
        },
      },
      {
        $project: {
          "created_by.password": 0,
          "created_by.created_at": 0,
          "created_by.updated_at": 0,
          "created_by.is_active": 0,
          "updated_by.password": 0,
          "updated_by.created_at": 0,
          "updated_by.updated_at": 0,
          "updated_by.is_active": 0,
        },
      },
      { $sort: { created_at: -1 } },
    ])
  cuisine.aggregatePaginate(aggregate, option, (err, result, pages, total) => {
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
};
exports.blockcuisine = (req, res) => {
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
      cuisine.findOneAndUpdate(quer, set, { new: true }, (error, updaterole) => {
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
              message: "Unblocked sucessfully",
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

