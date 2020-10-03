const country = require("../country_model/country");
const menu = require("../menu_model/menu");
const bank = require("../bank_model/bank");

const Validator = require("../../../util/validation").validate_all_request;
const {
  logger,
  responses,
  constants,
  commonFunctions,
} = require("../../../util");
const mongoose = require("mongoose");

exports.countryList = (req, res) => {
  try {
    let query = {
      is_active: true,
    };
    country.find(query, (err, resData) => {
      if (err) {
        return res.json({
          message_code: "500",
          message: "Internal_server_error",
        });
      } else {
        return res.json(resData);
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.menuList = (req, res) => {
  try {
    let query = {
      is_active: true,
    };
    menu.find(query, (err, resData) => {
      if (err) {
        return res.json({
          message_code: "500",
          message: "Internal_server_error",
        });
      } else {
        return res.json(resData);
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.bankList = (req, res) => {
  try {
    let query = {
      is_active: true,
    };
    bank.find(query, (err, resData) => {
      if (err) {
        return res.json({
          message_code: "500",
          message: "Internal_server_error",
        });
      } else {
        return res.json(resData);
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
