const staff = require("../model/staff");
const createEditViewProfile = require("../../users/model/CreateEditViewProfile");
const { body, check } = require("express-validator/check");
const { validationResult } = require("express-validator/check");
const {
  QueryList,
} = require("twilio/lib/rest/preview/understand/assistant/query");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var staffData = [];

exports.insert = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const languageCode = req.query.languageCode || "en";
      const userid = req.user._id || req.body.userid;
      let query = {
        _id: userid,
      };
      createEditViewProfile.findOne({ _id: userid }, (err, resdata) => {
        console.log("USer Found");
        if (err) {
          return res.json({
            message_code: "500",
            message: "Internal_server_error",
          });
        } else if (!resdata) {
          return res.json({
            message_code: "404",
            message: "Adding staff not allowed",
          });
        } else {
          req.body.created_by = userid;
          req.body.updated_by = userid;
          staff.create(req.body, (error, savestaff) => {
            if (error) {
              return res.json({
                message_code: "500",
                message: "Internal_server_error",
              });
            }
            return res.json({
              message_code: "200",
              message: "Staff added sucessfully",
            });
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.list = (req, res) => {
  staff
    .aggregate([
      {
        $match: { is_delete: false },
      },
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $project: {
          first_name: 1,
          last_name: 1,
          middle_name: 1,
          country_code: 1,
          mobile: 1,
          email: 1,
          gender: 1,
          created_by: 1,
          updated_by: 1,
          created_at: 1,
          updated_at: 1,
          is_active: 1,
          "role.name": 1,
          "role._id": 1,
        },
      },
    ])
    .exec((err, resdata) => {
      if (err) {
        return res.json({
          message_code: "500",
          message: "Internal_server_error",
        });
      } else if (resdata.length < 1) {
        return res.json({ message_code: "404", message: "No Data Found" });
      } else {
        let data = {
          data: resdata,
          message: "STAFF LIST",
          message_code: "200",
          adminName: req.user.first_name,
        };
        return res.json(data);
      }
    });
};

exports.getById = (req, res) => {
  const languageCode = req.query.languageCode || "en";
  const staffid = req.params.staffid;
  let query = {
    is_delete: false,
    _id: ObjectId(staffid),
  };
  staff
    .aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $project: {
          first_name: 1,
          last_name: 1,
          middle_name: 1,
          country_code: 1,
          mobile: 1,
          email: 1,
          gender: 1,
          created_by: 1,
          updated_by: 1,
          created_at: 1,
          updated_at: 1,
          "role.name": 1,
          "role._id": 1,
        },
      },
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
          message: "STAFF",
          message_code: "200",
        };
        return res.json(data);
      }
    });
};

exports.updateById = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const userid = req.user._id || req.body.userid;
    const staffid = req.params.staffid;
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
          message: "Updating role not allowed",
        });
      } else {
        let date = new Date();
        let quer = {
          _id: staffid,
        };
        let set = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          middle_name: req.body.middle_name,
          country_code: req.body.country_code,
          mobile: req.body.mobile,
          email: req.body.email,
          role: req.body.role,
          gender: req.body.gender,
        };
        if (req.body.is_active != undefined) {
          if (req.body.is_active) {
            set["is_active"] = true;
            set["is_block"] = false;
          } else {
            set["is_active"] = false;
            set["is_block"] = true;
          }
        }
        staff.findOneAndUpdate(
          quer,
          set,
          { new: true },
          (error, updaterole) => {
            if (error) {
              return res.json({
                message_code: "500",
                message: "Internal_server_error",
                err: error,
              });
            } else {
              return res.json({
                message_code: "200",
                message: "Staff updated sucessfully",
              });
            }
          }
        );
      }
    });
  }
};

exports.removeById = (req, res) => {
  const userid = req.user._id || req.body.userid;
  const staffid = req.params.staffid;
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
        message: "Deleting staff not allowed",
      });
    } else {
      let date = new Date();
      let query = {
        _id: staffid,
      };
      let set = {
        is_delete: true,
        is_active: false,
        updated_at: date,
        updated_by: userid,
      };
      staff.findOneAndUpdate(query, set, { new: true }, (error, updaterole) => {
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
    }
  });
};

exports.validateStaff = () => {
  return [
    check("mobile", "mobile doesnt exists").exists(),
    check(
      "mobile",
      "mobile minimum 10 and maximum 20 characters are required"
    ).isLength({
      min: 10,
      max: 20,
    }),
    check("mobile", "mobile number should be in number format").isInt(),
    check("first_name", "First Name doesnt exists").exists(),
    check(
      "first_name",
      "First Name minimum 3 and maximum 30 characters are required"
    ).isLength({
      min: 3,
      max: 30,
    }),
    check("last_name", "Last Name doesnt exists").exists(),
    check("country_code", "Country Code doesnt exists").exists(),
    check("email", "Invalid email").isEmail(),
    check("gender", "Gender doesnt exist").exists(),
    check("gender", "Gender should be male or female"),
    check("role", "Role doesnt exist").exists(),
  ];
};
